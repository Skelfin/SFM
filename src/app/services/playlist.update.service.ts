import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlaylistUpdateService {
  private playlistUpdatedSource = new Subject<void>();
  private trackDeletedSource = new Subject<number>();
  
  playlistUpdated$ = this.playlistUpdatedSource.asObservable();
  trackDeleted$ = this.trackDeletedSource.asObservable();

  notifyPlaylistUpdated() {
    this.playlistUpdatedSource.next();
  }
  
  notifyTrackDeleted(trackId: number) {
    this.trackDeletedSource.next(trackId);
  }
}
