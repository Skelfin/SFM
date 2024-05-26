import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Track } from '../types/track';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private audio = new Audio();
  private currentTrackSubject = new BehaviorSubject<Track | null>(null);
  private currentTimeSubject = new BehaviorSubject<number>(0);
  private durationSubject = new BehaviorSubject<number>(0);
  private isPlayingSubject = new BehaviorSubject<boolean>(false);
  private isMutedSubject = new BehaviorSubject<boolean>(false);
  private volumeSubject = new BehaviorSubject<number>(0.9);
  private previousVolume = 0.9;
  private maxVolume = 0.4;
  private tracks: Track[] = [];
  private currentIndex = 0;

  currentTrack$ = this.currentTrackSubject.asObservable();
  currentTime$ = this.currentTimeSubject.asObservable();
  duration$ = this.durationSubject.asObservable();
  isPlaying$ = this.isPlayingSubject.asObservable();
  isMuted$ = this.isMutedSubject.asObservable();
  volume$ = this.volumeSubject.asObservable();
  

  constructor() {
    this.audio.volume = this.volumeSubject.value * this.maxVolume;
    this.audio.addEventListener('timeupdate', this.updateCurrentTime.bind(this));
    this.audio.addEventListener('loadedmetadata', this.updateDuration.bind(this));
    this.audio.addEventListener('ended', () => {
      this.nextTrack();
      this.audio.play();
    });
  }

  loadMusic(tracks: Track[], trackId: number): void {
    this.tracks = tracks;
    const trackIndex = this.tracks.findIndex(track => track.id === trackId);
    if (trackIndex !== -1) {
      this.loadTrack(trackIndex, true);
    }
  }

  loadTrack(index: number, autoPlay: boolean = false): void {
    if (index >= 0 && index < this.tracks.length) {
      const track = this.tracks[index];
      this.currentTrackSubject.next(track);
      this.currentIndex = index;
      this.audio.src = `/server/track_path/${track.path}`;
      this.audio.load();
      this.audio.addEventListener('canplaythrough', () => {
        if (autoPlay) {
          this.audio.play();
          this.isPlayingSubject.next(true);
        }
      }, { once: true });
    }
  }

  togglePlay(): void {
    if (this.isPlayingSubject.value) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
    this.isPlayingSubject.next(!this.isPlayingSubject.value);
  }

  toggleMute(): void {
    if (this.isMutedSubject.value) {
      this.setVolume(this.previousVolume);
    } else {
      this.previousVolume = this.volumeSubject.value;
      this.setVolume(0);
    }
    this.isMutedSubject.next(!this.isMutedSubject.value);
  }

  setVolume(volume: number): void {
    this.volumeSubject.next(volume);
    this.audio.volume = volume * this.maxVolume;
    if (volume == 0) {
      this.isMutedSubject.next(true);
    } else {
      this.isMutedSubject.next(false);
      this.previousVolume = volume;
    }
  }

  seekTrack(time: number): void {
    this.audio.currentTime = time;
    this.currentTimeSubject.next(time);
  }

  previousTrack(): void {
    const newIndex = this.currentIndex - 1;
    if (newIndex >= 0) {
      this.loadTrack(newIndex);
    }
  }

  nextTrack(): void {
    const newIndex = (this.currentIndex + 1) % this.tracks.length;
    this.loadTrack(newIndex);
  }

  private updateCurrentTime(): void {
    this.currentTimeSubject.next(this.audio.currentTime);
  }

  private updateDuration(): void {
    this.durationSubject.next(this.audio.duration);
  }
}
