import { Component } from '@angular/core';
import { Album } from '../../../types/album';
import { CommonModule } from '@angular/common';
import { AlbumTableService } from '../../../services/album-table.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PluralPipe } from '../../../pipes/plural.pipe';

@Component({
  selector: 'app-album-info',
  standalone: true,
  imports: [CommonModule, PluralPipe, RouterLink],
  templateUrl: './album-info.component.html',
  styleUrl: './album-info.component.scss'
})
export class AlbumInfoComponent {
  album: Album | null = null;

  constructor(
    private albumTableService: AlbumTableService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadAlbum();
    this.albumTableService.albumCreated$.subscribe(() => {
      this.loadAlbum();
    });
  }

  getAuthors(album: Album): string {
    return album && album.authors ? album.authors.map(author => author.nickname).join(', ') : 'No authors';
  }

  loadAlbum(): void {
    this.route.paramMap.subscribe((params) => {
      const encodedId = params.get('id');
      if (encodedId) {
        const albumId = this.decodeId(encodedId);
        this.albumTableService
          .getAlbumById(albumId)
          .subscribe((album) => {
            this.album = album;
          });
      }
    });
  }

  encodeId(id: number): string {
    const salt = 'Sec1t';
    const saltedId = `${salt}${id}${salt}`;
    return btoa(saltedId);
  }

  decodeId(encodedId: string): number {
    const decodedString = atob(encodedId);
    const salt = 'Sec1t';
    return parseInt(
      decodedString.slice(salt.length, decodedString.length - salt.length)
    );
  }

}
