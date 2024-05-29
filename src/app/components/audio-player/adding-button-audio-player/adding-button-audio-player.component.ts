import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faHeart,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription, firstValueFrom, forkJoin } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { UserProfilePlaylistService } from '../../../services/profile-playlist-user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlaylistTableService } from '../../../services/playlist-table.service';
import { Playlist } from '../../../types/playlist';
import { PopupManagerAudioPlayerService } from '../../../services/popup-manager-audio-player-manager.service';
import { PlaylistUpdateAudioPlayerService } from '../../../services/playlist.update.audio-playler.service';

@Component({
  selector: 'app-adding-button-audio-player',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './adding-button-audio-player.component.html',
  styleUrl: './adding-button-audio-player.component.scss'
})
export class AddingButtonAudioPlayerComponent implements OnInit, OnDestroy {
  @Input() trackId!: number;
  @ViewChild('popupButton', { static: false }) popupButton!: ElementRef;
  faHeart = faHeart;
  faCheck = faCheck;
  isPopupVisible = false;
  selectedPlaylists: number[] = [];
  initialSelectedPlaylists: number[] = [];
  private popupSubscription!: Subscription;
  private resizeSubscription!: () => void;
  popupPosition = { top: 0, left: 0 };

  constructor(
    private popupManager: PopupManagerAudioPlayerService,
    private elementRef: ElementRef,
    private UserProfilePlaylistService: UserProfilePlaylistService,
    private playlistTableService: PlaylistTableService,
    private snackBar: MatSnackBar,
    private playlistUpdateService: PlaylistUpdateAudioPlayerService,
  ) {}
  
  ngOnInit() {
    this.loadUserPlaylists();
    this.popupSubscription = this.popupManager.currentPopup$.subscribe(id => {
      this.isPopupVisible = (id === this.trackId);
      if (this.isPopupVisible) {
        this.checkExistingPlaylists();
        this.setPopupPosition();
      } else {
        this.selectedPlaylists = [];
        this.initialSelectedPlaylists = [];
      }
    });
    this.resizeSubscription = this.addResizeListener();
  }

  ngOnDestroy() {
    this.popupSubscription.unsubscribe();
    this.removeResizeListener();
  }

  togglePopup(event: MouseEvent) {
    event.stopPropagation();
    const currentPopupId = this.popupManager.getCurrentPopup();
    if (currentPopupId !== this.trackId) {
      this.popupManager.openPopup(this.trackId);
    } else {
      this.popupManager.closePopup();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.isPopupVisible && !this.elementRef.nativeElement.contains(event.target)) {
      this.popupManager.closePopup();
    }
  }

  playlists: Playlist[] = [];
  userId!: number;

  decodeToken(): any {
    const token = localStorage.getItem('token');
    return token ? jwtDecode(token) : null;
  }

  loadUserPlaylists() {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.id) {
      this.userId = decodedToken.id;
      this.UserProfilePlaylistService.getUserPlaylists(this.userId).subscribe(
        (playlists) => {
          this.playlists = playlists.sort((a, b) => a.id - b.id);
          this.checkExistingPlaylists();
        }
      );
    }
  }

  checkExistingPlaylists() {
    const trackChecks = this.playlists.map(playlist => 
      this.playlistTableService.getTracksByPlaylistId(playlist.id).toPromise()
    );

    forkJoin(trackChecks).subscribe(allTracks => {
      this.selectedPlaylists = [];
      
      this.playlists.forEach((playlist, index) => {
        const tracks = allTracks[index];
        if (tracks?.some(track => track.id === this.trackId)) {
          this.selectedPlaylists.push(playlist.id);
        }
      });
      
      this.initialSelectedPlaylists = [...this.selectedPlaylists];
    });
  }

  selectPlaylist(playlistId: number) {
    if (this.selectedPlaylists.includes(playlistId)) {
      this.selectedPlaylists = this.selectedPlaylists.filter(id => id !== playlistId);
    } else {
      this.selectedPlaylists.push(playlistId);
    }
  }

  saveTrackToPlaylists() {
    const playlistsToAdd = this.selectedPlaylists.filter(id => !this.initialSelectedPlaylists.includes(id));
    const playlistsToRemove = this.initialSelectedPlaylists.filter(id => !this.selectedPlaylists.includes(id));
  
    const addRequests = playlistsToAdd.map(playlistId =>
      firstValueFrom(this.playlistTableService.addTrackToPlaylist(playlistId, this.trackId))
    );
  
    const removeRequests = playlistsToRemove.map(playlistId =>
      firstValueFrom(this.playlistTableService.removeTrackFromPlaylist(playlistId, this.trackId))
    );
  
    forkJoin([...addRequests, ...removeRequests]).subscribe({
      next: () => {
        this.snackBar.open('Изменения успешно сохранены', 'OK', {
          duration: 3000,
        });
        playlistsToRemove.forEach(id => {
          this.playlistUpdateService.notifyTrackDeleted(this.trackId);
        });
        playlistsToAdd.forEach(id => {
          this.playlistUpdateService.notifyTrackAdded(this.trackId);
        });
        this.playlistUpdateService.notifyPlaylistUpdated();
        this.popupManager.closePopup();
      },
      error: (err) => {
        console.error('Error saving changes:', err);
        this.snackBar.open('Произошла ошибка при сохранении изменений', 'OK', {
          duration: 3000,
        });
      }
    });
  }

  private setPopupPosition() {
    if (this.popupButton) {
      const buttonRect = this.popupButton.nativeElement.getBoundingClientRect();
      this.popupPosition.top = buttonRect.top - 15 - 10 + window.scrollY;
      this.popupPosition.left = buttonRect.right + 250 + window.scrollX;
    }
  }

  // Method to add resize event listener
  private addResizeListener() {
    const resizeListener = () => {
      if (this.isPopupVisible) {
        this.setPopupPosition();
      }
    };
    window.addEventListener('resize', resizeListener);
    return () => window.removeEventListener('resize', resizeListener);
  }

  // Method to remove resize event listener
  private removeResizeListener() {
    if (this.resizeSubscription) {
      this.resizeSubscription();
    }
  }
}