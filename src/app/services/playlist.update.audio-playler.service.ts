import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlaylistUpdateAudioPlayerService {
  private playlistUpdatedSource = new Subject<void>();
  private trackDeletedSource = new Subject<number>();
  private trackAddedSource = new Subject<number>();

  playlistUpdated$ = this.playlistUpdatedSource.asObservable();
  trackDeleted$ = this.trackDeletedSource.asObservable();
  trackAdded$ = this.trackAddedSource.asObservable();

  notifyPlaylistUpdated() {
    this.playlistUpdatedSource.next();
  }

  notifyTrackDeleted(trackId: number) {
    this.trackDeletedSource.next(trackId);
  }

  notifyTrackAdded(trackId: number) {
    this.trackAddedSource.next(trackId);
  }
}
