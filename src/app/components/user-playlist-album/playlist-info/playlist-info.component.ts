import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { PlaylistPopupComponent } from "../playlist-popup/playlist-popup.component";
import { Playlist } from '../../../types/playlist';
import { PlaylistTableService } from '../../../services/playlist-table.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-playlist-info',
    standalone: true,
    templateUrl: './playlist-info.component.html',
    styleUrl: './playlist-info.component.scss',
    imports: [FontAwesomeModule, PlaylistPopupComponent]
})
export class PlaylistInfoComponent {
  faPen = faPen
  faTrash = faTrash
}
