import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { Track } from '../../../types/track';
import { TrackTableService } from '../../../services/track-table.service';

@Component({
  selector: 'app-admin-popup-tracks',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-popup-tracks.component.html',
  styleUrl: './admin-popup-tracks.component.scss',
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateY(0)' })),
      transition('void => *', [
        style({ transform: 'translateY(-100%)' }),
        animate('450ms ease-out')
      ]),
      transition('* => void', [
        animate('500ms ease-in-out', style({ transform: 'translateY(-100%)' }))
      ])
    ])
  ]
})
export class AdminPopupTracksComponent {
  @Output() close = new EventEmitter<void>();
  @Input() track: Track | null = null;
  nameModel: string = '';
  trackFile: File | null = null;
  avatarFile: File | null = null;

  closeModal() {
    this.close.emit();
  }

  fileChangeEventAvatar(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files?.length) {
      this.avatarFile = element.files[0];
    } else {
      this.avatarFile = null;
    }
  }

  fileChangeEventTrack(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files?.length) {
      this.trackFile = element.files[0];
    } else {
      this.trackFile = null;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['track']) {
      const track: Track = changes['track'].currentValue;
      this.nameModel = track && track.name ? track.name : '';
    }
  }

  constructor(private trackTableService: TrackTableService) { }
  saveTrack() {
    if (!this.track) {
      console.error('Трека не существует');
      return;
    }
    const formData = new FormData();
    formData.append('name', this.nameModel);

    if (this.trackFile) {
      formData.append('path', this.trackFile, this.trackFile.name);
    }
  
    if (this.avatarFile) {
      formData.append('avatar', this.avatarFile, this.avatarFile.name);
    }
  
    this.trackTableService.updateTrack(this.track.id, formData);
    this.closeModal();
  }
}
