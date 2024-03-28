import { Component } from '@angular/core';
import { TruncatePipe } from "../../../truncate.pipe";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Playlist } from '../../../types/playlist';
import { PlaylistTableService } from '../../../services/playlist-table.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
    selector: 'app-admin-table-playlists',
    standalone: true,
    templateUrl: './admin-table-playlists.component.html',
    styleUrl: './admin-table-playlists.component.scss',
    imports: [TruncatePipe, FontAwesomeModule, NgxPaginationModule]
})
export class AdminTablePlaylistsComponent {
  currentPage = 1
  faTrash = faTrash
  faPenToSquare = faPenToSquare
  showModal: boolean = false;

  constructor(private playlistTableService: PlaylistTableService) {}
  playlists: Playlist[] = [];
  ngOnInit(): void {
    this.loadPlaylists();
  }

  loadPlaylists(): void {
    this.playlistTableService.getPlaylists().subscribe(playlists => {
      this.playlists = playlists;
    });
  }
}
