import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock, faCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-table-album',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './table-album.component.html',
  styleUrl: './table-album.component.scss'
})
export class TableAlbumComponent {
  faClock = faClock
  faCircle = faCircle
}
