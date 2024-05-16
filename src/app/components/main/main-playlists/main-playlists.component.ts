import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Subscription, Subject, debounceTime } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { SearchService } from '../../../services/SearchService';
import { RouterLink } from '@angular/router';
import { Playlist } from '../../../types/playlist';
import { PlaylistTableService } from '../../../services/playlist-table.service';

@Component({
  selector: 'app-main-playlists',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './main-playlists.component.html',
  styleUrl: './main-playlists.component.scss'
})
export class MainPlaylistsComponent implements OnInit {

  private searchSubscription!: Subscription;
  private playlist: Playlist[] = [];

  filteredPlaylists: Playlist[] = [];
  shuffledPlaylists: Playlist[] = [];

  constructor(private searchService: SearchService,private playlistTableService: PlaylistTableService) {}

  ngOnInit(): void {
    this.loadPlaylist()
    this.searchSubscription = this.searchService.getSearchText().subscribe(text => {
      this.filterPlaylist(text);
    });
    this.scrollEventDebouncer$.pipe(
      debounceTime(0)
    ).subscribe(() => {
      this.updateScrollButtons();
    });
  }

  loadPlaylist(): void {
    this.playlistTableService.getPlaylists().subscribe(playlist => {
      this.playlist = playlist.filter(p => p.user.access_rights === 1);
      this.shuffledPlaylists = this.shufflePlaylist();
      this.filteredPlaylists = this.shuffledPlaylists;
    });
  }

  filterPlaylist(searchText: string): void {
    this.filteredPlaylists = this.shuffledPlaylists.filter(card =>
      card.name.toLowerCase().includes(searchText.toLowerCase())
    );
    this.scrollEventDebouncer$.next();
  }

  shufflePlaylist(): any[] {
    let array = [...this.playlist];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  encodeId(id: number): string {
    const salt = 'Sec1t';
    const saltedId = `${salt}${id}${salt}`;
    return btoa(saltedId);
  }

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
}
