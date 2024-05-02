import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock, faCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-table-playlist',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './table-playlist.component.html',
  styleUrl: './table-playlist.component.scss'
})
export class TablePlaylistComponent {
  faClock = faClock
  faCircle = faCircle

}
