import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock, faCircle } from '@fortawesome/free-solid-svg-icons';
import { Album } from '../../../types/album';
import { Track } from '../../../types/track';
import { ActivatedRoute } from '@angular/router';
import { AlbumTableService } from '../../../services/album-table.service';
import { AudioService } from '../../../services/audio.service';
import { AddingButtonComponent } from "../../adding-button/adding-button.component";
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-table-album',
    standalone: true,
    templateUrl: './table-album.component.html',
    styleUrl: './table-album.component.scss',
    imports: [FontAwesomeModule, AddingButtonComponent, CommonModule]
})
export class TableAlbumComponent {
  faClock = faClock
  faCircle = faCircle

  album: Album | null = null;

  ngOnInit(): void {
    this.loadAlbum();
  }

  constructor(private route: ActivatedRoute, private albumTableService: AlbumTableService, private audioService: AudioService, public authService: AuthService) {}

  loadAlbum(): void {
    this.route.paramMap.subscribe(params => {
      const encodedId = params.get('id');
      if (encodedId) {
        const albumId = this.decodeId(encodedId);
        this.albumTableService.getAlbumById(albumId).subscribe(album => {
          this.album = album;
          this.album.tracks.forEach(track => {
            track.authors = this.album?.authors;
            this.fetchTrackDuration(track);
          });
        });
      }
    });
  }

  getAuthors(): string {
    return this.album && this.album.authors ? this.album.authors.map(author => author.nickname).join(', ') : 'No authors';
  }


  fetchTrackDuration(track: Track): void {
    const audio = new Audio();
    audio.src = `server/track_path/${track.path}`;
    audio.addEventListener('loadedmetadata', () => {
      track.duration = this.formatDuration(audio.duration);
    });
  }
  
  
  formatDuration(duration: number): string {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }


  decodeId(encodedId: string): number {
    const decodedString = atob(encodedId);
    const salt = 'Sec1t';
    return parseInt(decodedString.slice(salt.length, decodedString.length - salt.length));
  }

  playTrack(trackId: number): void {
    if (this.album) {
      this.audioService.loadMusic(this.album.tracks, trackId);
    }
  }
}
