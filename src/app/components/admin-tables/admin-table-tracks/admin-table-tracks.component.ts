import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { NgxPaginationModule } from 'ngx-pagination';
import { TruncatePipe } from "../../../pipes/truncate.pipe";
import { Track } from '../../../types/track';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TrackTableService } from '../../../services/track-table.service';
import { AdminPopupTracksComponent } from "../../admin-popup/admin-popup-tracks/admin-popup-tracks.component";

@Component({
    selector: 'app-admin-table-tracks',
    standalone: true,
    templateUrl: './admin-table-tracks.component.html',
    styleUrl: './admin-table-tracks.component.scss',
    imports: [TruncatePipe, FontAwesomeModule, NgxPaginationModule, AdminPopupTracksComponent]
})
export class AdminTableTracksComponent {
  currentPage = 1
  faTrash = faTrash
  faPenToSquare = faPenToSquare
  showModal: boolean = false;
  selectedTrack: Track | null = null;

  openModal(track: Track) {
    this.showModal = true;
    this.selectedTrack = track;
  }

  closeModal() {
    this.showModal = false;
    this.loadTracks();
  }

  constructor(private trackTableService: TrackTableService, private readonly snackBar: MatSnackBar) {}
  tracks: Track[] = [];
  ngOnInit(): void {
    this.loadTracks();
    this.trackTableService.trackCreated$.subscribe(() => {
      this.loadTracks();
    });
  }

  loadTracks(): void {
    this.trackTableService.getTrack().subscribe(tracks => {
      this.tracks = tracks;
    });
  }

  deleteTrack(trackId: number) {
    this.trackTableService.deleteTrack(trackId).subscribe(() => {
      this.snackBar.open('Пользователь удален', 'ОК', {
        duration: 3000,
      });
      this.loadTracks();
    });
  }

}
