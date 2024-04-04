import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TrackTableService } from '../../../services/track-table.service';

@Component({
  selector: 'app-admin-form-tracks',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-form-tracks.component.html',
  styleUrl: './admin-form-tracks.component.scss'
})
export class AdminFormTracksComponent {

  trackForm: FormGroup;

  constructor(private trackFormService: TrackTableService) {
    this.trackForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      path: new FormControl(null, [Validators.required]),
      avatar: new FormControl(''),
  });
  }

  onFileSelect(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      const file = element.files[0];
      this.trackForm.patchValue({ avatar: file });
      // Если нужно, обновляем состояние валидации для этого поля
      this.trackForm.get('avatar')?.updateValueAndValidity();
    }
  }

  onTrackSelect(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      const file = element.files[0];
      this.trackForm.patchValue({ path: file });
      // Обновляем состояние валидации для этого поля
      this.trackForm.get('path')?.updateValueAndValidity();
    }
  }


  onSubmit() {
    if (this.trackForm.valid) {
      const formData = new FormData();
      Object.keys(this.trackForm.value).forEach(key => {
        // Здесь проверяем, не является ли текущий ключ одним из файловых полей
        if (key !== 'path' && key !== 'avatar') {
          formData.append(key, this.trackForm.value[key]);
        }
      });
  
      // Обработка файла трека
      const trackFileControl = this.trackForm.get('path');
      if (trackFileControl && trackFileControl.value) {
        const trackFile = trackFileControl.value;
        formData.append('path', trackFile, trackFile.name);
      }
  
      // Обработка файла аватара, если он есть
      const avatarFileControl = this.trackForm.get('avatar');
      if (avatarFileControl && avatarFileControl.value) {
        const avatarFile = avatarFileControl.value;
        formData.append('avatar', avatarFile, avatarFile.name);
      }
  
      // Отправляем formData вместо простого JSON объекта
      this.trackFormService.createTrack(formData)
    } else {
      console.error('Form is invalid');
    }
  }
  


}
