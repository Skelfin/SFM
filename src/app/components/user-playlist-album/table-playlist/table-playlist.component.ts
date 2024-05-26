import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock, faCircle } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Track } from '../../../types/track';
import { TrackTableService } from '../../../services/track-table.service';
import { Album } from '../../../types/album';
import { AlbumTableService } from '../../../services/album-table.service';
import { AudioService } from '../../../services/audio.service';

@Component({
  selector: 'app-table-playlist',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './table-playlist.component.html',
  styleUrl: './table-playlist.component.scss'
})
export class TablePlaylistComponent implements OnInit {
  faClock = faClock
  faCircle = faCircle
  constructor(private trackTableService: TrackTableService, private route: ActivatedRoute, private albumTableService: AlbumTableService, private audioService: AudioService) {}
  tracks: Track[] = [];
  albums: Album[] = [];


  ngOnInit(): void {
    this.loadAlbum();
    this.loadTracksForPlaylist();
  }

  loadAlbum(): void {
    this.albumTableService.getAlbum().subscribe((albums) => {
      this.albums = albums;
    });
  }
  
  getAuthors(track: Track): string {
    return track.album && track.album.authors ? track.album.authors.map(author => author.nickname).join(', ') : 'No authors';
  }

  loadTracksForPlaylist(): void {
    this.route.paramMap.subscribe(params => {
      const encodedId = params.get('id');
      if (encodedId) {
        const playlistId = this.decodeId(encodedId);
        this.trackTableService.getTracksByPlaylistId(playlistId).subscribe(tracks => {
          this.tracks = tracks;
          this.tracks.forEach(track => {
            track.authors = track.album ? track.album.authors : [];
            this.fetchTrackDuration(track);
          });
        });
      }
    });
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
  
  encodeId(id: number): string {
    const salt = 'Sec1t';
    const saltedId = `${salt}${id}${salt}`;
    return btoa(saltedId);
  }
  
  decodeId(encodedId: string): number {
    const decodedString = atob(encodedId);
    const salt = 'Sec1t';
    return parseInt(decodedString.slice(salt.length, decodedString.length - salt.length));
  }

  playTrack(trackId: number): void {
    this.audioService.loadMusic(this.tracks, trackId);
  }
}
