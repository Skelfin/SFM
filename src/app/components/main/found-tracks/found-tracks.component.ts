import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchService } from '../../../services/SearchService';
import { CommonModule } from '@angular/common';
import { Track } from '../../../types/track';
import { TrackTableService } from '../../../services/track-table.service';
import { RouterLink } from '@angular/router';
import { AudioService } from '../../../services/audio.service';
import { AlbumTableService } from '../../../services/album-table.service';
import { AddingButtonComponent } from "../../adding-button/adding-button.component";

@Component({
    selector: 'app-found-tracks',
    standalone: true,
    templateUrl: './found-tracks.component.html',
    styleUrl: './found-tracks.component.scss',
    imports: [CommonModule, RouterLink, AddingButtonComponent]
})
export class FoundTracksComponent implements OnInit {
  constructor(private searchService: SearchService, private trackTableService: TrackTableService, private audioService: AudioService, private albumTableService: AlbumTableService) {}
  private searchText: string = '';

  private searchSubscription!: Subscription;
  private tracks: Track[] = [];
  filteredTracks: Track[] = [];


  ngOnInit(): void {
    this.loadTracks();
    this.filteredTracks = this.tracks.slice(0, 8);
    this.searchSubscription = this.searchService
      .getSearchText()
      .subscribe((text) => {
        this.searchText = text;
        this.filterTracks();
      });
  }

  loadTracks(): void {
    this.trackTableService.getTrack().subscribe(tracks => {
      this.tracks = tracks;
      this.tracks.forEach(track => {
        this.fetchAlbumAuthors(track);
        this.fetchTrackDuration(track);
      });
      this.filterTracks();
    });
  }

  fetchAlbumAuthors(track: Track): void {
    this.albumTableService.getAlbumById(track.album.id).subscribe(album => {
      track.authors = album.authors;
    });
  }

  filterTracks(): void {
    this.filteredTracks = this.searchText
      ? this.tracks
          .filter((card) =>
            card.name.toLowerCase().includes(this.searchText.toLowerCase())
          )
          .slice(0, 8)
      : this.tracks.slice(0, 8);
  }

  fetchTrackDuration(track: Track): void {
    const audio = new Audio();
    audio.src = `server/track_path/${track.path}`;
    audio.addEventListener('loadedmetadata', () => {
      track.duration = this.formatDuration(audio.duration);
    });
  }
  
  encodeId(id: number): string {
    const salt = 'Sec1t';
    const saltedId = `${salt}${id}${salt}`;
    return btoa(saltedId);
  }
  
  formatDuration(duration: number): string {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  getAuthors(track: Track): string {
    return track.authors ? track.authors.map(author => author.nickname).join(', ') : 'No authors';
  }

  playTrack(trackId: number): void {
    const selectedTrack = this.tracks.find(track => track.id === trackId);
    if (selectedTrack) {
      this.audioService.loadMusic([selectedTrack], trackId);
    }
  }
}
