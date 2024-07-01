import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlbumTableService } from '../../../services/album-table.service';

@Component({
  selector: 'app-admin-form-albums',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-form-albums.component.html',
  styleUrl: './admin-form-albums.component.scss'
})
export class AdminFormAlbumsComponent {
  albumForm: FormGroup;
  constructor(private albumTableService: AlbumTableService) {
    this.albumForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      avatar: new FormControl(''),
      year: new FormControl('', 
      [Validators.required,
        Validators.min(1800), 
        Validators.max(2024),
        Validators.pattern('^[0-9]{4}$')
      ]),
      authorIds: new FormControl('', [Validators.required])
    });
  }

  onFileSelect(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      const file = element.files[0];
      this.albumForm.patchValue({ avatar: file });
      this.albumForm.get('avatar')?.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (this.albumForm.valid) {
      const formData = new FormData();
      Object.keys(this.albumForm.value).forEach(key => {
        if (key !== 'avatar') {
          formData.append(key, this.albumForm.value[key]);
        }
      });
  
      const fileControl = this.albumForm.get('avatar');
      if (fileControl && fileControl.value) {
        const file = fileControl.value;
        formData.append('avatar', file, file.name);
      }
  
      this.albumTableService.createAlbum(formData)
      console.log('Form Data:', {
        ...this.albumForm.value,
        avatar: fileControl?.value ? fileControl.value.name : null
      });
    } else {
      console.error('Form is invalid');
    }
  }

}
