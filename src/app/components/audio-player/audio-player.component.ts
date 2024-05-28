import { Component, OnInit } from '@angular/core';
import { Track } from '../../types/track';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBackward, faForward, faCirclePause, faCirclePlay, faVolumeUp, faVolumeMute, faVolumeLow } from '@fortawesome/free-solid-svg-icons';
import { AudioService } from '../../services/audio.service';
import { Observable } from 'rxjs';
import { AddingButtonAudioPlayerComponent } from "./adding-button-audio-player/adding-button-audio-player.component";

@Component({
    selector: 'app-audio-player',
    standalone: true,
    templateUrl: './audio-player.component.html',
    styleUrl: './audio-player.component.scss',
    imports: [CommonModule, FormsModule, FontAwesomeModule, AddingButtonAudioPlayerComponent]
})
export class AudioPlayerComponent implements OnInit {
  currentTrack$: Observable<Track | null>;
  currentTime$: Observable<number>;
  duration$: Observable<number>;
  isPlaying$: Observable<boolean>;
  isMuted$: Observable<boolean>;
  volume$: Observable<number>;

  volume = 0.9;
  previousVolume = this.volume;

  faBackward = faBackward;
  faForward = faForward;
  faCirclePlay = faCirclePlay;
  faCirclePause = faCirclePause;
  faVolumeUp = faVolumeUp;
  faVolumeMute = faVolumeMute;
  faVolumeLow = faVolumeLow;
  
  constructor(public audioService: AudioService) {
    this.currentTrack$ = this.audioService.currentTrack$;
    this.currentTime$ = this.audioService.currentTime$;
    this.duration$ = this.audioService.duration$;
    this.isPlaying$ = this.audioService.isPlaying$;
    this.isMuted$ = this.audioService.isMuted$;
    this.volume$ = this.audioService.volume$;
  }

  ngOnInit(): void {
    this.volume$.subscribe(volume => this.volume = volume);
  }

  togglePlay(): void {
    this.audioService.togglePlay();
  }

  toggleMute(): void {
    if (this.volume > 0) {
      this.previousVolume = this.volume;
      this.audioService.setVolume(0);
    } else {
      this.audioService.setVolume(this.previousVolume);
    }
  }

  setVolume(event: any): void {
    const newVolume = event.target.value;
    this.audioService.setVolume(newVolume);
    this.volume = newVolume;
    if (newVolume > 0) {
      this.previousVolume = newVolume;
    }
  }

  getAuthors(track: Track | null): string {
    return track?.authors?.map(author => author.nickname).join(', ') || '';
  }

  seekTrack(event: any): void {
    this.audioService.seekTrack(event.target.value);
  }

  previousTrack(): void {
    this.audioService.previousTrack();
  }

  nextTrack(): void {
    this.audioService.nextTrack();
  }

  formatTime(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = Math.floor(seconds % 60);
    return `${this.padZero(minutes)}:${this.padZero(remainingSeconds)}`;
  }

  private padZero(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }
}