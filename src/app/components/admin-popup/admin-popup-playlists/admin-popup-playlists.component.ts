import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { Playlist } from '../../../types/playlist';
import { PlaylistTableService } from '../../../services/playlist-table.service';

@Component({
  selector: 'app-admin-popup-playlists',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-popup-playlists.component.html',
  styleUrl: './admin-popup-playlists.component.scss',
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
export class AdminPopupPlaylistsComponent {
  @Output() close = new EventEmitter<void>();
  @Input() playlist: Playlist | null = null;
  nameModel: string = '';
  descriptionModel: string = '';
  trackIdsModel: string = '';
  avatarFile: File | null = null;

  fileChangeEvent(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files?.length) {
      this.avatarFile = element.files[0];
    } else {
      this.avatarFile = null;
    }
  }

  getIdsAsString(items: { id: number }[]): string {
    return items && items.length > 0
      ? items
          .sort((a, b) => a.id - b.id)
          .map(item => item.id)
          .join(' ')
      : '';
  }

  closeModal() {
    this.close.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['playlist'] && changes['playlist'].currentValue) {
      const playlist: Playlist = changes['playlist'].currentValue;
      this.nameModel = playlist.name ? playlist.name : '';
      this.descriptionModel = playlist.description ? playlist.description : '';
      this.trackIdsModel = this.getIdsAsString(playlist.tracks);
    }
  }

  constructor(private playlistTableService: PlaylistTableService) { }
  savePlaylist() {
    if (!this.playlist) {
      console.error('Плейлиста не существует');
      return;
    }
  
    const trackIdsArray = this.trackIdsModel
    .split(' ')
    .map(id => parseInt(id, 10))
    .filter(id => !isNaN(id))
    .sort((a, b) => a - b)

    const formData = new FormData();
    formData.append('name', this.nameModel);
    formData.append('description', this.descriptionModel);
    trackIdsArray.forEach(id => {
      formData.append('trackIds[]', id.toString());
    });
    if (this.avatarFile) {
      formData.append('avatar', this.avatarFile, this.avatarFile.name);
    }
    this.playlistTableService.updatePlaylist(this.playlist.id, formData);
    this.closeModal();
  }
}
