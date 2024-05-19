import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { Author } from '../../../types/author';
import { AuthorTableService } from '../../../services/author-table.service';

@Component({
  selector: 'app-admin-popup-authors',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-popup-authors.component.html',
  styleUrl: './admin-popup-authors.component.scss',
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateY(0)' })),
      transition('void => *', [
        style({ transform: 'translateY(-100%)' }),
        animate('450ms ease-out'),
      ]),
      transition('* => void', [
        animate('500ms ease-in-out', style({ transform: 'translateY(-100%)' })),
      ]),
    ]),
  ],
})
export class AdminPopupAuthorsComponent {
  @Output() close = new EventEmitter<void>();
  @Input() author: Author | null = null;
  nicknameModel: string = '';
  descriptionModel: string = '';
  avatarFile: File | null = null;
  albumIdsModel: string = '';
  private isMouseDownInsideModal: boolean = false;

  fileChangeEvent(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files?.length) {
      this.avatarFile = element.files[0];
    } else {
      this.avatarFile = null;
    }
  }

  getIdsAsString(items: { id: number }[]): string {
    return items && items.length > 0
      ? items
          .sort((a, b) => a.id - b.id)
          .map(item => item.id)
          .join(' ')
      : '';
  }

  closeModal() {
    this.close.emit();
  }

  onMouseDownInsideModal(event: MouseEvent): void {
    this.isMouseDownInsideModal = true;
    event.stopPropagation();
  }

  onMouseUp(event: MouseEvent): void {
    if (!this.isMouseDownInsideModal) {
      this.closeModal();
    }
    this.isMouseDownInsideModal = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['author'] && changes['author'].currentValue) {
      const author: Author = changes['author'].currentValue;
      this.nicknameModel = author.nickname ? author.nickname : '';
      this.descriptionModel = author.description ? author.description : '';
      this.albumIdsModel = this.getIdsAsString(author.albums);
    }
  }

  parseIdsFromString(idsString: string): number[] {
    return idsString
      .split(' ')
      .map(id => parseInt(id, 10))
      .filter(id => !isNaN(id))
      .sort((a, b) => a - b);
  }

  constructor(private authorTableService: AuthorTableService) {}
  saveAuthor() {
    if (!this.author) {
      console.error('Автора не существует');
      return;
    }
    
    const albumIdsArray = this.parseIdsFromString(this.albumIdsModel);

    const formData = new FormData();
    formData.append('nickname', this.nicknameModel);
    formData.append('description', this.descriptionModel);
    albumIdsArray.forEach(id => formData.append('albumIds[]', id.toString()));
    if (this.avatarFile) {
      formData.append('avatar', this.avatarFile, this.avatarFile.name);
    }
    this.authorTableService.updateAuthor(this.author.id, formData);
    this.closeModal();
  }
}
