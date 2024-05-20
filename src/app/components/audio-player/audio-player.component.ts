import { Component, OnInit } from '@angular/core';
import { Track } from '../../types/track';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TrackTableService } from '../../services/track-table.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBackward, faForward, faCirclePause, faCirclePlay, faVolumeUp, faVolumeMute, faVolumeLow } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule ],
  templateUrl: './audio-player.component.html',
  styleUrl: './audio-player.component.scss',
})
export class AudioPlayerComponent implements OnInit {
  currentTrack: Track | null = null;
  currentIndex = 0;
  isPlaying = false;
  isMuted = false;
  volume = 0.9;
  previousVolume = this.volume;
  currentTime = 0;
  duration = 0;
  private maxVolume = 0.25;

  faBackward = faBackward;
  faForward = faForward;
  faCirclePlay = faCirclePlay;
  faCirclePause = faCirclePause;
  faVolumeUp = faVolumeUp;
  faVolumeMute = faVolumeMute;
  faVolumeLow = faVolumeLow;

  private audio = new Audio();
  constructor(private trackTableService: TrackTableService) {}
  tracks: Track[] = [];

  loadTracks(): void {
    this.trackTableService.getTrack().subscribe(tracks => {
      this.tracks = tracks;
      console.log(tracks)
    });
  }

  ngOnInit(): void {
    this.audio.volume = this.volume * this.maxVolume;
    this.loadTracks();
    this.audio.addEventListener('ended', () => {
      this.nextTrack();
    });
  }

  loadTrack(index: number): void {
    if (index >= 0 && index < this.tracks.length) {
      this.currentTrack = this.tracks[index];
      this.currentIndex = index;
      this.audio.src = `/server/track_path/${this.currentTrack.path}`;
      this.audio.load();
      this.audio.addEventListener('timeupdate', this.updateCurrentTime.bind(this));
      this.audio.addEventListener('loadedmetadata', this.updateDuration.bind(this));

      if (this.isPlaying) {
        this.audio.play();
      }
    }
  }

  togglePlay(): void {
    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  toggleMute(): void {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.previousVolume = this.volume;
      this.volume = 0;
    } else {
      this.volume = this.previousVolume;
    }
    this.audio.volume = this.volume * this.maxVolume;
  }

  setVolume(event: any): void {
    const newVolume = event.target.value * this.maxVolume;
    this.audio.volume = newVolume;
    this.volume = event.target.value;
    if (this.volume > 0) {
      this.isMuted = false;
    } else {
      this.isMuted = true;
    }
  }

  updateCurrentTime(): void {
    this.currentTime = this.audio.currentTime;
  }

  updateDuration(): void {
    this.duration = this.audio.duration;
  }

  seekTrack(event: any): void {
    this.audio.currentTime = event.target.value;
    this.currentTime = this.audio.currentTime;
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

  formatTime(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = Math.floor(seconds % 60);
    return `${this.padZero(minutes)}:${this.padZero(remainingSeconds)}`;
  }

  padZero(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }
}