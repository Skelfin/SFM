import { Component, EventEmitter, Input, Output } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlaylistTableService } from '../../services/playlist-table.service';

@Component({
  selector: 'app-user-create-playlist-popup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-create-playlist-popup.component.html',
  styleUrl: './user-create-playlist-popup.component.scss',
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateY(0)' })),
      transition('void => *', [
        style({ transform: 'translateY(-100%)' }),
        animate('450ms ease-out')
      ]),
      transition('* => void', [
        animate('500ms ease-in-out', style({ transform: 'translateY(-100%)' }))
      ])
    ])
  ]
})
export class UserCreatePlaylistPopupComponent {
  @Input() showModal: boolean = false;
  @Output() close = new EventEmitter<void>();
  playlistForm: FormGroup;
  private isMouseDownInsideModal: boolean = false;
  constructor(private playlistTableService: PlaylistTableService) {
    this.playlistForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      avatar: new FormControl('')
    });
  }

  onFileSelect(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      const file = element.files[0];
      this.playlistForm.patchValue({ avatar: file });
      // Если нужно, обновляем состояние валидации для этого поля
      this.playlistForm.get('avatar')?.updateValueAndValidity();
    }
  }
  

  onSubmit() {
    if (this.playlistForm.valid) {
      const formData = new FormData();
      Object.keys(this.playlistForm.value).forEach(key => {
        if (key !== 'avatar') {
          formData.append(key, this.playlistForm.value[key]);
        }
      });
  
      // Проверяем, есть ли файл перед добавлением
      const fileControl = this.playlistForm.get('avatar');
      if (fileControl && fileControl.value) {
        const file = fileControl.value;
        formData.append('avatar', file, file.name);
      }
  
      this.playlistTableService.createPlaylist(formData)
      this.closeModal()
    } else {
      console.error('Form is invalid');
    }
  }

  closeModal() {
    this.close.emit();
  }

  onMouseDownInsideModal(event: MouseEvent): void {
    this.isMouseDownInsideModal = true;
    event.stopPropagation();
  }

  onMouseUp(event: MouseEvent): void {
    if (!this.isMouseDownInsideModal) {
      this.closeModal();
    }
    this.isMouseDownInsideModal = false;
  }

}
