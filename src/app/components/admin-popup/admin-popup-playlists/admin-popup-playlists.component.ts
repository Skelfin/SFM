import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { Playlist } from '../../../types/playlist';

@Component({
  selector: 'app-admin-popup-playlists',
  standalone: true,
  imports: [ FormsModule, FontAwesomeModule],
  templateUrl: './admin-popup-playlists.component.html',
  styleUrl: './admin-popup-playlists.component.scss',
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
export class AdminPopupPlaylistsComponent {
  faDeleteLeft = faDeleteLeft
  @Output() close = new EventEmitter<void>();
  @Input() playlist: Playlist | null = null;

  closeModal() {
    this.close.emit();
  }
  
}
