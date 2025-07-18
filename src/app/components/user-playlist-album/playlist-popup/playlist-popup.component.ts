import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { Playlist } from '../../../types/playlist';
import { PlaylistTableService } from '../../../services/playlist-table.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-playlist-popup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './playlist-popup.component.html',
  styleUrl: './playlist-popup.component.scss',
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
export class PlaylistPopupComponent {
  @Output() close = new EventEmitter<void>();
  @Input() playlist: Playlist | null = null;
  nameModel: string = '';
  descriptionModel: string = '';
  avatarFile: File | null = null;
  private isMouseDownInsideModal: boolean = false;

  fileChangeEvent(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files?.length) {
      this.avatarFile = element.files[0];
    } else {
      this.avatarFile = null;
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['playlist'] && changes['playlist'].currentValue) {
      const playlist: Playlist = changes['playlist'].currentValue;
      this.nameModel = playlist.name ? playlist.name : '';
      this.descriptionModel = playlist.description ? playlist.description : '';
    }
  }

  constructor(private playlistTableService: PlaylistTableService, private readonly snackBar: MatSnackBar, private router: Router) { }
  savePlaylist() {
    if (!this.playlist) {
      console.error('Плейлиста не существует');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.nameModel);
    formData.append('description', this.descriptionModel);
    if (this.avatarFile) {
      formData.append('avatar', this.avatarFile, this.avatarFile.name);
    }
    this.playlistTableService.updateBasicUserPlaylist(this.playlist.id, formData);
    this.closeModal();
  }

  deletePlaylist(playlistId: number) {
    this.playlistTableService.deletePlaylist(playlistId).subscribe(() => {
      this.snackBar.open('Плейлист удален', 'ОК', {
        duration: 3000,
      });
      this.router.navigate(['/main']);
    });
  }
}
