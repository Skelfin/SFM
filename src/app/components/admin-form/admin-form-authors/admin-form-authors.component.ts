import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthorTableService } from '../../../services/author-table.service';


@Component({
  selector: 'app-admin-form-authors',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-form-authors.component.html',
  styleUrl: './admin-form-authors.component.scss'
})
export class AdminFormAuthorsComponent {
  authorForm: FormGroup;
  constructor(private authorTableService: AuthorTableService) {
    this.authorForm = new FormGroup({
      nickname: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      avatar: new FormControl('')
    });
  }

  onFileSelect(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      const file = element.files[0];
      this.authorForm.patchValue({ avatar: file });
      this.authorForm.get('avatar')?.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (this.authorForm.valid) {
      const formData = new FormData();
      Object.keys(this.authorForm.value).forEach(key => {
        if (key !== 'avatar') {
          formData.append(key, this.authorForm.value[key]);
        }
      });
  
      const fileControl = this.authorForm.get('avatar');
      if (fileControl && fileControl.value) {
        const file = fileControl.value;
        formData.append('avatar', file, file.name);
      }
  
      this.authorTableService.createAuthor(formData)
    } else {
      console.error('Form is invalid');
    }
  }

}
