import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Subscription, Subject, debounceTime } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { SearchService } from '../../../services/SearchService';

interface MusicCard {
  id: number
  title: string;
  image: string;
  description: string;
}

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
  private musicCards: MusicCard[] = [
    { id: 1, title: 'аль1', image: '../assets/1.png', description: 'Rolling with the \'bops\' in your Kimbap.' },
    { id: 2, title: 'аль1', image: '../assets/1.png', description: 'when you wake up next to him in the middle of the...' },
    { id: 3, title: 'аль2', image: '../assets/1.png', description: 'when you wake up next to him in the middle of the...' },
    { id: 4, title: 'аль3', image: '../assets/1.png', description: 'when you wake up next to him in the middle of the...' },
    { id: 5, title: 'аль4', image: '../assets/1.png', description: 'when you wake up next to him in the middle of the...' },
    { id: 6, title: 'аль5', image: '../assets/1.png', description: 'when you wake up next to him in the middle of the...' },
    { id: 7, title: 'аль6', image: '../assets/1.png', description: 'when you wake up next to him in the middle of the...' },
    { id: 8, title: 'аль7', image: '../assets/1.png', description: 'when you wake up next to him in the middle of the...' },
    { id: 9, title: 'аль8', image: '../assets/1.png', description: 'when you wake up next to him in the middle of the...' },
    { id: 10, title: 'аль9', image: '../assets/1.png', description: 'when you wake up next to him in the middle of the...' },
    { id: 11, title: 'аль10', image: '../assets/1.png', description: 'when you wake up next to him in the middle of the...' },
    { id: 12, title: 'аль11', image: '../assets/1.png', description: 'when you wake up next to him in the middle of the...' },
  ];

  filteredMusicCards: MusicCard[] = [];
  shuffledMusicCards: MusicCard[] = [];

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.shuffledMusicCards = this.shuffleMusicCards();
    this.filteredMusicCards = this.shuffledMusicCards;
    this.searchSubscription = this.searchService.getSearchText().subscribe(text => {
      this.filterMusicCards(text);
    });
    this.scrollEventDebouncer$.pipe(
      debounceTime(0)
    ).subscribe(() => {
      this.updateScrollButtons();
    });
  }

  
  filterMusicCards(searchText: string): void {
    this.filteredMusicCards = this.shuffledMusicCards.filter(card =>
      card.title.toLowerCase().includes(searchText.toLowerCase())
    );
    this.scrollEventDebouncer$.next();
  }

  shuffleMusicCards(): any[] {
    let array = [...this.musicCards];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
