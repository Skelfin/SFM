import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-searcher',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './searcher.component.html',
  styleUrl: './searcher.component.scss'
})
export class SearcherComponent {
  faXmark = faXmark
  searchText: string = '';
}
