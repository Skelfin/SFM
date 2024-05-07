import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { NgxPaginationModule } from 'ngx-pagination';
import { TruncatePipe } from '../../../pipes/truncate.pipe';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Album } from '../../../types/album';
import { AlbumTableService } from '../../../services/album-table.service';
import { AdminPopupAlbumsComponent } from "../../admin-popup/admin-popup-albums/admin-popup-albums.component";

@Component({
    selector: 'app-admin-table-albums',
    standalone: true,
    templateUrl: './admin-table-albums.component.html',
    styleUrl: './admin-table-albums.component.scss',
    imports: [FontAwesomeModule, TruncatePipe, NgxPaginationModule, AdminPopupAlbumsComponent]
})
export class AdminTableAlbumsComponent {
  currentPage = 1;
  faTrash = faTrash;
  faPenToSquare = faPenToSquare;
  showModal: boolean = false;
  selectedAlbum: Album | null = null;

  constructor(
    private albumTableService: AlbumTableService,
    private readonly snackBar: MatSnackBar
  ) {}
  albums: Album[] = [];

  getAuthors(album: Album): string {
    if (album.authors && album.authors.length > 0) {
      return album.authors.map(author => author.id).join(', ');
    } else {
      return 'N/A';
    }
  }

  getTrackIds(album: Album): string {
    if (album.tracks && album.tracks.length > 0) {
      return album.tracks
        .map(track => track.id)
        .sort((a, b) => a - b)
        .join(', ');
    } else {
      return 'N/A';
    }
  }

  openModal(albums: Album) {
    this.showModal = true;
    this.selectedAlbum = albums;
  }

  closeModal() {
    this.showModal = false;
    this.loadAlbum();
  }

  ngOnInit(): void {
    this.loadAlbum();
    this.albumTableService.albumCreated$.subscribe(() => {
      this.loadAlbum();
    });
  }

  loadAlbum(): void {
    this.albumTableService.getAlbum().subscribe((albums) => {
      this.albums = albums;
    });
  }

  deleteAlbum(albumId: number) {
    this.albumTableService.deleteAlbum(albumId).subscribe(() => {
      this.snackBar.open('Пользователь удален', 'ОК', {
        duration: 3000,
      });
      this.loadAlbum();
    });
  }
}
