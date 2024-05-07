import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { NgxPaginationModule } from 'ngx-pagination';
import { TruncatePipe } from '../../../pipes/truncate.pipe';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthorTableService } from '../../../services/author-table.service';
import { AdminPopupAuthorsComponent } from '../../admin-popup/admin-popup-authors/admin-popup-authors.component';
import { Author } from '../../../types/author';

@Component({
  selector: 'app-admin-table-authors',
  standalone: true,
  templateUrl: './admin-table-authors.component.html',
  styleUrl: './admin-table-authors.component.scss',
  imports: [
    FontAwesomeModule,
    TruncatePipe,
    NgxPaginationModule,
    AdminPopupAuthorsComponent,
  ],
})
export class AdminTableAuthorsComponent {
  currentPage = 1;
  faTrash = faTrash;
  faPenToSquare = faPenToSquare;
  showModal: boolean = false;
  selectedAuthor: Author | null = null;

  constructor(
    private authorTableService: AuthorTableService,
    private readonly snackBar: MatSnackBar
  ) {}
  authors: Author[] = [];

  openModal(author: Author) {
    this.showModal = true;
    this.selectedAuthor = author;
  }

  getAlbumIds(author: Author): string {
    if (author.albums && author.albums.length > 0) {
      return author.albums
        .map(album => album.id)
        .sort((a, b) => a - b)
        .join(', ');
    } else {
      return 'N/A';
    }
  }

  closeModal() {
    this.showModal = false;
    this.loadAuthor();
  }

  ngOnInit(): void {
    this.loadAuthor();
    this.authorTableService.authorCreated$.subscribe(() => {
      this.loadAuthor();
    });
  }

  loadAuthor(): void {
    this.authorTableService.getAuthor().subscribe((authors) => {
      this.authors = authors;
    });
  }

  deleteAuthor(authorId: number) {
    this.authorTableService.deleteAuthor(authorId).subscribe(() => {
      this.snackBar.open('Пользователь удален', 'ОК', {
        duration: 3000,
      });
      this.loadAuthor();
    });
  }
}
