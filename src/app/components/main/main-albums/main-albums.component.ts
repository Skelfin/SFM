import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Subscription, Subject, debounceTime } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { SearchService } from '../../../services/SearchService';
import { Album } from '../../../../server/dist/albums/entities/album.entity';
import { AlbumTableService } from '../../../services/album-table.service';
import { ArrowsBlockComponent } from "../../arrows-block/arrows-block.component";

@Component({
    selector: 'app-main-albums',
    standalone: true,
  imports: [FontAwesomeModule],
    templateUrl: './main-albums.component.html',
  styleUrl: './main-albums.component.scss'
})
export class MainAlbumsComponent implements OnInit {
  faArrowLeft = faArrowLeft
  faArrowRight = faArrowRight
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

  private searchSubscription!: Subscription;
  private album: Album[] = [];

  filteredAlbums: Album[] = [];

  constructor(private searchService: SearchService, private albumTableService: AlbumTableService) {}

  getAuthors(album: Album): string {
    return album.authors ? album.authors.map(author => author.nickname).join(', ') : 'No authors';
  }

  ngOnInit(): void {
    this.loadAlbum()
    this.searchSubscription = this.searchService.getSearchText().subscribe(text => {
      this.filterAlbum(text);
    });
    this.scrollEventDebouncer$.pipe(
      debounceTime(0)
    ).subscribe(() => {
      this.updateScrollButtons();
    });
  }

  loadAlbum(): void {
    this.albumTableService.getAlbum().subscribe(album => {
      this.album = album;
      this.album = album;
      this.filteredAlbums = this.shuffleAlbum([...this.album]);
    });
  }
  
  filterAlbum(searchText: string): void {
    const searchTextLower = searchText.toLowerCase();
    this.filteredAlbums = this.album.filter(card =>
      card.name.toLowerCase().includes(searchTextLower)
    );
    this.filteredAlbums = this.shuffleAlbum([...this.filteredAlbums]);
    this.scrollEventDebouncer$.next();
  }

  shuffleAlbum(array: Album[]): Album[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
