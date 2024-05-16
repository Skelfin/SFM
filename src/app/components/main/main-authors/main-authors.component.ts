import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Subscription, Subject, debounceTime } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { SearchService } from '../../../services/SearchService';
import { Author } from '../../../types/author';
import { AuthorTableService } from '../../../services/author-table.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-authors',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './main-authors.component.html',
  styleUrl: './main-authors.component.scss'
})
export class MainAuthorsComponent implements OnInit {
  private searchSubscription!: Subscription;
  private author: Author[] = []; 

  filteredAuthors: Author[] = [];
  shuffledAuthors: Author[] = [];

  constructor(private searchService: SearchService, private authorTableService: AuthorTableService) {}

  ngOnInit(): void {
    this.loadAuthor()
    this.searchSubscription = this.searchService.getSearchText().subscribe(text => {
      this.filterAuthor(text);
    });
    this.scrollEventDebouncer$.pipe(
      debounceTime(0)
    ).subscribe(() => {
      this.updateScrollButtons();
    });
  }

  loadAuthor(): void {
    this.authorTableService.getAuthor().subscribe(author => {
      this.author = author;
      this.shuffledAuthors = this.shuffleAuthor();
      this.filteredAuthors = this.shuffledAuthors;
    });
  }

  filterAuthor(searchText: string): void {
    this.filteredAuthors = this.shuffledAuthors.filter(card =>
      card.nickname.toLowerCase().includes(searchText.toLowerCase())
    );
    this.scrollEventDebouncer$.next();
  }

  shuffleAuthor(): any[] {
    let array = [...this.author];
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

}
