import { Component, ViewChild, ElementRef, HostListener, OnInit  } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface MusicCard {
  id: number
  title: string;
  image: string;
  description: string;
}

@Component({
  selector: 'app-main-playlists',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './main-playlists.component.html',
  styleUrl: './main-playlists.component.scss'
})
export class MainPlaylistsComponent implements OnInit {
  faArrowLeft = faArrowLeft
  faArrowRight = faArrowRight
  canScrollLeft: boolean = false;
  canScrollRight: boolean = true;
  @ViewChild('scrollContainer') scrollContainerRef!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    this.updateScrollButtons();
    this.scrollContainerRef.nativeElement.addEventListener('scroll', this.updateScrollButtons.bind(this));
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
    const scrollContainer = this.scrollContainerRef.nativeElement;
    scrollContainer.scrollBy({ left: -450, behavior: 'smooth' });
    setTimeout(() => this.updateScrollButtons(), 200);
  }

  scrollRight(): void {
    const scrollContainer = this.scrollContainerRef.nativeElement;
    scrollContainer.scrollBy({ left: 450, behavior: 'smooth' });
    setTimeout(() => this.updateScrollButtons(), 200);
  }


  private musicCards: MusicCard[] = [
    { id: 1, title: 'KimBops!', image: '../assets/Home.jpg', description: 'Rolling with the \'bops\' in your Kimbap.' },
    { id: 2, title: 'pov1', image: '../assets/Home.jpg', description: 'when you wake up next to him in the middle of the...' },
    { id: 3, title: 'pov2', image: '../assets/Home.jpg', description: 'when you wake up next to him in the middle of the...' },
    { id: 4, title: 'pov3', image: '../assets/Home.jpg', description: 'when you wake up next to him in the middle of the...' },
    { id: 5, title: 'pov4', image: '../assets/Home.jpg', description: 'when you wake up next to him in the middle of the...' },
    { id: 6, title: 'pov5', image: '../assets/Home.jpg', description: 'when you wake up next to him in the middle of the...' },
    { id: 7, title: 'pov6', image: '../assets/Home.jpg', description: 'when you wake up next to him in the middle of the...' },
    { id: 8, title: 'pov7', image: '../assets/Home.jpg', description: 'when you wake up next to him in the middle of the...' },
    { id: 9, title: 'pov8', image: '../assets/Home.jpg', description: 'when you wake up next to him in the middle of the...' },
    { id: 10, title: 'pov9', image: '../assets/Home.jpg', description: 'when you wake up next to him in the middle of the...' },
    { id: 11, title: 'pov10', image: '../assets/Home.jpg', description: 'when you wake up next to him in the middle of the...' },
    { id: 12, title: 'pov11', image: '../assets/Home.jpg', description: 'when you wake up next to him in the middle of the...' },
  ];

  shuffledMusicCards: MusicCard[] = [];

  ngOnInit(): void {
    this.shuffledMusicCards = this.shuffleMusicCards();
  }

  shuffleMusicCards(): any[] {
    // Копируем массив
    let array = [...this.musicCards];
    // Перемешиваем массив
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    // Возвращаем до 8 элементов
    return array;
  }
}
