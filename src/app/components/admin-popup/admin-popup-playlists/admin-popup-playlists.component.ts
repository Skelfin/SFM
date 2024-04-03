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

  closeModal() {
    this.close.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['playlist']) {
      const playlist: Playlist = changes['playlist'].currentValue;
      this.nameModel = playlist && playlist.name ? playlist.name : '';
      this.descriptionModel = playlist && playlist.description ? playlist.description : '';
    }
  }

  constructor(private playlistTableService: PlaylistTableService) { }
  savePlaylist() {
    if (!this.playlist) {
      console.error('Плейлиста не существует');
      return;
    }
  
    const updatedPlaylistData: any = {
      name: this.nameModel,
      description: this.descriptionModel,
      avatar: 'path/to/avatar.jpg',
    };
  
    console.log(updatedPlaylistData);
    this.playlistTableService.updatePlaylist(this.playlist.id, updatedPlaylistData);
    this.closeModal();
  }
}
