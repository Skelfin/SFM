import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlaylistTableService } from '../../../services/playlist-table.service';

@Component({
  selector: 'app-admin-form-playlists',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-form-playlists.component.html',
  styleUrl: './admin-form-playlists.component.scss'
})
export class AdminFormPlaylistsComponent {
  playlistForm: FormGroup;
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
    } else {
      console.error('Form is invalid');
    }
  }

}

