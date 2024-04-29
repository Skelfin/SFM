import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { SearchService } from '../../../services/SearchService';


@Component({
  selector: 'app-searcher',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './searcher.component.html',
  styleUrl: './searcher.component.scss'
})
export class SearcherComponent {
  faMagnifyingGlass = faMagnifyingGlass
  faXmark = faXmark
  searchText: string = '';

  constructor(private searchService: SearchService) {}

  updateSearchText(text: string): void {
    this.searchService.setSearchText(text);
  }

  clearSearch(): void {
    this.searchText = '';
    this.updateSearchText(this.searchText);
  }

  ngOnInit(): void {
    this.searchService.getSearchText().subscribe(text => {
      this.searchText = text;  // Подписка на обновления поискового запроса
    });
  }

  ngOnDestroy(): void {
    this.searchService.clearSearchText();  // Сбрасываем поисковый запрос при уничтожении компонента
  }
}
