import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { PlaylistPopupComponent } from '../playlist-popup/playlist-popup.component';
import { Playlist } from '../../../types/playlist';
import { PlaylistTableService } from '../../../services/playlist-table.service';
import { ActivatedRoute } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-playlist-info',
  standalone: true,
  templateUrl: './playlist-info.component.html',
  styleUrl: './playlist-info.component.scss',
  imports: [CommonModule, FontAwesomeModule, PlaylistPopupComponent],
})
export class PlaylistInfoComponent implements OnInit {
  faPen = faPen;
  faTrash = faTrash;
  showModal: boolean = false;
  playlist: Playlist | null = null;
  isCreator: boolean = false;
  isFirstPlaylist: boolean = false;

  constructor(
    private playlistTableService: PlaylistTableService,
    private route: ActivatedRoute
  ) {}

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.loadPlaylist();
  }

  ngOnInit(): void {
    this.loadPlaylist();
    this.playlistTableService.playlistCreated$.subscribe(() => {
      this.loadPlaylist();
    });
  }

  loadPlaylist(): void {
    this.route.paramMap.subscribe((params) => {
      const encodedId = params.get('id');
      if (encodedId) {
        const playlistId = this.decodeId(encodedId);
        this.playlistTableService
          .getPlaylistById(playlistId)
          .subscribe((playlist) => {
            this.playlist = playlist;
            this.checkCreator();
            this.checkIfFirstPlaylist();
          });
      }
    });
  }

  checkCreator(): void {
    const decodedToken = this.decodeToken();
    this.isCreator =
      decodedToken &&
      this.playlist &&
      decodedToken.id === this.playlist.user.id;
  }

  checkIfFirstPlaylist(): void {
    if (this.playlist && this.playlist.user) {
      // Проверка прав доступа пользователя
      if (this.playlist.user.access_rights === 1) {
        // Администратор
        this.isFirstPlaylist = false;
      } else {
        // Обычный пользователь
        this.playlistTableService.getPlaylistsByUser(this.playlist.user.id)
          .subscribe((playlists: Playlist[]) => {
            if (playlists.length > 0) {
              const firstPlaylist = playlists.reduce((prev: Playlist, curr: Playlist) => {
                return new Date(prev.createdAt) <= new Date(curr.createdAt) ? prev : curr;
              });
              this.isFirstPlaylist = firstPlaylist.id === this.playlist?.id;
            }
          });
      }
    }
  }

  decodeToken(): any {
    const token = localStorage.getItem('token');
    return token ? jwtDecode(token) : null;
  }

  decodeId(encodedId: string): number {
    const decodedString = atob(encodedId);
    const salt = 'Sec1t';
    return parseInt(
      decodedString.slice(salt.length, decodedString.length - salt.length)
    );
  }
}
