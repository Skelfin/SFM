import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { jwtDecode } from 'jwt-decode';
import { UserProfilePlaylistService } from '../../../services/profile-playlist-user';
import { Playlist } from '../../../types/playlist';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-profile-playlists',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './user-playlists.component.html',
  styleUrl: './user-playlists.component.scss'
})
export class UserProfilePlaylistsComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  canScrollLeft: boolean = false;
  canScrollRight: boolean = true;
  @ViewChild('scrollContainer') scrollContainerRef!: ElementRef<HTMLElement>;
  private scrollEventDebouncer$ = new Subject<void>();

  ngAfterViewInit(): void {
    this.scrollContainerRef.nativeElement.addEventListener('scroll', () => {
      this.scrollEventDebouncer$.next();
    });
    this.scrollContainerRef.nativeElement.addEventListener('wheel', this.handleMouseWheel.bind(this), { passive: false });
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateScrollButtons();
  }

  updateScrollButtons(): void {
    const scrollContainer = this.scrollContainerRef.nativeElement;
    const tolerance = 1;
    this.canScrollLeft = scrollContainer.scrollLeft > tolerance;
    this.canScrollRight = scrollContainer.scrollWidth > scrollContainer.clientWidth + scrollContainer.scrollLeft + tolerance;
  }

  scrollLeft(): void {
    this.performScroll(-650);
  }

  scrollRight(): void {
    this.performScroll(650);
  }

  handleMouseWheel(event: WheelEvent): void {
    event.preventDefault();
    const delta = event.deltaY > 0 ? 400 : -400; 
    this.performScroll(delta);
  }

  performScroll(delta: number): void {
    const scrollContainer = this.scrollContainerRef.nativeElement;
    scrollContainer.scrollBy({ left: delta, behavior: 'smooth' });
  }

  playlists: Playlist[] = [];
  userId!: number;

  constructor(private UserProfilePlaylistService: UserProfilePlaylistService) {}

  ngOnInit(): void {
    this.loadUserPlaylists();
    this.scrollEventDebouncer$.pipe(
      debounceTime(0)
    ).subscribe(() => {
      this.updateScrollButtons();
    });
  }

  loadUserPlaylists() {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.id) {
      this.userId = decodedToken.id;
      this.UserProfilePlaylistService.getUserPlaylists(this.userId).subscribe(playlists => {
        this.playlists = playlists;
        this.scrollEventDebouncer$.next();
      });
    }
  }
  
  encodeId(id: number): string {
    const salt = 'Sec1t';
    const saltedId = `${salt}${id}${salt}`;
    return btoa(saltedId);
  }

  decodeToken(): any {
    const token = localStorage.getItem('token');
    return token ? jwtDecode(token) : null;
  }
}
