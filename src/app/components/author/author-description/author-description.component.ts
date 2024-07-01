import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorTableService } from '../../../services/author-table.service';
import { Author } from '../../../types/author';

@Component({
  selector: 'app-author-description',
  standalone: true,
  imports: [],
  templateUrl: './author-description.component.html',
  styleUrl: './author-description.component.scss'
})
export class AuthorDescriptionComponent implements OnInit  {
  author: Author | null = null;
  formattedDescription: string = '';

  constructor(
    private authorTableService: AuthorTableService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadAuthor();
  }

  loadAuthor(): void {
    this.route.paramMap.subscribe((params) => {
      const encodedId = params.get('id');
      if (encodedId) {
        const authorId = this.decodeId(encodedId);
        this.authorTableService.getAuthorById(authorId).subscribe((author) => {
          this.author = author;
          this.formatDescription();
        });
      }
    });
  }

  decodeId(encodedId: string): number {
    const decodedString = atob(encodedId);
    const salt = 'Sec1t';
    return parseInt(decodedString.slice(salt.length, decodedString.length - salt.length));
  }

  formatDescription(): void {
    if (this.author && this.author.description) {
      this.formattedDescription = this.author.description
        .replace(/(?:\r\n|\r|\n)/g, '<br>')
        .replace(/\n{2,}/g, '</p><p>') 
        .replace(/^/, '<p>') 
        .replace(/$/, '</p>'); 
    }
  }
}