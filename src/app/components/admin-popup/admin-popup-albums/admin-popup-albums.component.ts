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
import { Album } from '../../../types/album';
import { AlbumTableService } from '../../../services/album-table.service';

@Component({
  selector: 'app-admin-popup-albums',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-popup-albums.component.html',
  styleUrl: './admin-popup-albums.component.scss',
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
export class AdminPopupAlbumsComponent {
  @Output() close = new EventEmitter<void>();
  @Input() album: Album | null = null;
  nameModel: string = '';
  descriptionModel: string = '';
  trackIdsModel: string = '';
  authorIdsModel: string = '';
  avatarFile: File | null = null;
  yearModel: number | null = null;

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['album'] && changes['album'].currentValue) {
      const album: Album = changes['album'].currentValue;
      this.nameModel = album.name ? album.name : '';
      this.descriptionModel = album.description ? album.description : '';
      this.yearModel = album.year ? album.year : null;
      this.trackIdsModel = this.getIdsAsString(album.tracks);
      this.authorIdsModel = this.getIdsAsString(album.authors);
    }
  }

  formValid(): boolean {
    return this.nameModel.trim() !== '' && this.yearModel !== null && this.yearModel >= 1800 && this.yearModel <= 2024;
  }

  parseIdsFromString(idsString: string): number[] {
    return idsString
      .split(' ')
      .map(id => parseInt(id, 10))
      .filter(id => !isNaN(id))
      .sort((a, b) => a - b);
  }
  
  constructor(private albumTableService: AlbumTableService) {}
  saveAlbum() {
    if (!this.album) {
      console.error('Автора не существует');
      return;
    }

    const trackIdsArray = this.parseIdsFromString(this.trackIdsModel);
    const authorIdsArray = this.parseIdsFromString(this.authorIdsModel);

    const formData = new FormData();
    formData.append('name', this.nameModel);
    formData.append('description', this.descriptionModel);
    trackIdsArray.forEach(id => formData.append('trackIds[]', id.toString()));
    authorIdsArray.forEach(id => formData.append('authorIds[]', id.toString()));
    if (this.avatarFile) {
      formData.append('avatar', this.avatarFile, this.avatarFile.name);
    }
    if (this.yearModel !== null) {
      formData.append('year', this.yearModel.toString());
    }
    this.albumTableService.updateAlbum(this.album.id, formData);
    this.closeModal();
  }
}