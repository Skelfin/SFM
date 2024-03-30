import { Component } from '@angular/core';
import { TruncatePipe } from "../../../truncate.pipe";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Playlist } from '../../../types/playlist';
import { PlaylistTableService } from '../../../services/playlist-table.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminPopupPlaylistsComponent } from "../../admin-popup/admin-popup-playlists/admin-popup-playlists.component";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-admin-table-playlists',
    standalone: true,
    templateUrl: './admin-table-playlists.component.html',
    styleUrl: './admin-table-playlists.component.scss',
    imports: [TruncatePipe, FontAwesomeModule, NgxPaginationModule, AdminPopupPlaylistsComponent]
})
export class AdminTablePlaylistsComponent {
  currentPage = 1
  faTrash = faTrash
  faPenToSquare = faPenToSquare
  showModal: boolean = false;
  selectedPlaylist: Playlist | null = null;


  openModal(playlist: Playlist) {
    this.showModal = true;
    this.selectedPlaylist = playlist;
  }
  closeModal() {
    this.showModal = false;
    this.loadPlaylists();
  }

  constructor(private playlistTableService: PlaylistTableService, private readonly snackBar: MatSnackBar) {}
  playlists: Playlist[] = [];
  ngOnInit(): void {
    this.loadPlaylists();
    this.playlistTableService.playlistCreated$.subscribe(() => {
      this.loadPlaylists();
    });
  }

  loadPlaylists(): void {
    this.playlistTableService.getPlaylists().subscribe(playlists => {
      this.playlists = playlists;
    });
  }
  deletePlaylist(playlistId: number) {
    this.playlistTableService.deletePlaylist(playlistId).subscribe(() => {
      this.snackBar.open('Пользователь удален', 'ОК', {
        duration: 3000,
      });
      this.loadPlaylists();
    });
  }
}
