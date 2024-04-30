import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Subscription, Subject, debounceTime } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { SearchService } from '../../../services/SearchService';

interface MusicCard {
  id: number
  title: string;
  image: string;
}

@Component({
  selector: 'app-main-authors',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './main-authors.component.html',
  styleUrl: './main-authors.component.scss'
})
export class MainAuthorsComponent implements OnInit {
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
    { id: 1, title: 'pov12', image: '../assets/Home.jpg'},
    { id: 2, title: 'pov1', image: '../assets/Home.jpg'},
    { id: 3, title: 'pov2', image: '../assets/Home.jpg'},
    { id: 4, title: 'pov3', image: '../assets/Home.jpg'},
    { id: 5, title: 'pov4', image: '../assets/Home.jpg'},
    { id: 6, title: 'pov5', image: '../assets/Home.jpg'},
    { id: 7, title: 'pov6', image: '../assets/Home.jpg'},
    { id: 8, title: 'pov7', image: '../assets/Home.jpg'},
    { id: 9, title: 'pov8', image: '../assets/Home.jpg'},
    { id: 10, title: 'pov9', image: '../assets/Home.jpg'},
    { id: 11, title: 'pov10', image: '../assets/Home.jpg'},
    { id: 12, title: 'pov11', image: '../assets/Home.jpg'},
  ];

  shuffledMusicCards: MusicCard[] = [];
  filteredMusicCards: MusicCard[] = [];

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
