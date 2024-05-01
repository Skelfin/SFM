import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchService } from '../../../services/SearchService';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCirclePlus,
  faCircleCheck,
  faCircle,
} from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

interface MusicCard {
  id: number;
  title: string;
  image: string;
  album: string;
}

@Component({
  selector: 'app-found-tracks',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './found-tracks.component.html',
  styleUrl: './found-tracks.component.scss',
})
export class FoundTracksComponent implements OnInit {
  faCircle = faCircle;
  faCircleCheck = faCircleCheck;
  faCirclePlus = faCirclePlus;
  constructor(private searchService: SearchService) {}
  private searchText: string = '';
  private searchSubscription!: Subscription;
  private musicCards: MusicCard[] = [
    { id: 1, title: 'Return', album: 'return', image: '../assets/4.png' },
    {
      id: 2,
      title: 'Radar новинок asdadaывфвфывфывыф dasdasdasdadad dsadasdsa',
      album: 'return',
      image: '../assets/4.png',
    },
    {
      id: 3,
      title: 'Return2',
      album: 'return вфывфывыфвфвыфвфвфывф ввввввввввввввввввввввв',
      image: '../assets/4.png',
    },
    { id: 4, title: 'Return3', album: 'return', image: '../assets/4.png' },
    { id: 5, title: 'Return4', album: 'return', image: '../assets/4.png' },
    { id: 6, title: 'Return5', album: 'return', image: '../assets/4.png' },
    { id: 7, title: 'Return6', album: 'return', image: '../assets/4.png' },
    { id: 8, title: 'Return7', album: 'return', image: '../assets/4.png' },
    { id: 9, title: 'Return8', album: 'return', image: '../assets/4.png' },
  ];
  filteredMusicCards: MusicCard[] = [];

  ngOnInit(): void {
    this.filteredMusicCards = this.musicCards.slice(0, 8);
    this.searchSubscription = this.searchService
      .getSearchText()
      .subscribe((text) => {
        this.searchText = text;
        this.filterMusicCards();
      });
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  filterMusicCards(): void {
    this.filteredMusicCards = this.searchText
      ? this.musicCards
          .filter((card) =>
            card.title.toLowerCase().includes(this.searchText.toLowerCase())
          )
          .slice(0, 8)
      : this.musicCards.slice(0, 8);
  }

  trackSelections: { [id: number]: boolean } = {};
  selectedIcon: { [key: number]: boolean } = {};
  openDropdownIndex: number | null = null;
  toggleDropdown(cardId: number): void {
    this.openDropdownIndex = this.openDropdownIndex === cardId ? null : cardId;
  }
  toggleIcon(cardId: number): void {
    this.selectedIcon[cardId] = !this.selectedIcon[cardId];
  }
  closeDropdown(): void {
    this.openDropdownIndex = null;
  }

  finalizeSelection(): void {
    let anySelected = false;
  
    Object.keys(this.selectedIcon).forEach(key => {
      const cardId = Number(key);
      if (this.selectedIcon[cardId]) {
        anySelected = true;
        this.trackSelections[cardId] = true;
      }
    });
  
    if (!anySelected) {
      Object.keys(this.trackSelections).forEach(key => {
        const cardId = Number(key);
        this.trackSelections[cardId] = false;
      });
    }
  
    this.closeDropdown();
  }

}
