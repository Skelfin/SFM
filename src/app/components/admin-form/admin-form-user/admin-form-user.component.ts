import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserFormService } from '../../../services/user-table/user.form.service';

@Component({
  selector: 'app-admin-form-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-form-user.component.html',
  styleUrl: './admin-form-user.component.scss'
})
export class AdminFormUserComponent {
  userForm: FormGroup;

  constructor(private userFormService: UserFormService) {
    this.userForm = new FormGroup({
      nickname: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      access_rights: new FormControl(null ,Validators.required),
      avatar: new FormControl(''),
  });
  }


  onFileSelect(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      const file = element.files[0];
      this.userForm.patchValue({ avatar: file });
      // Если нужно, обновляем состояние валидации для этого поля
      this.userForm.get('avatar')?.updateValueAndValidity();
    }
  }
  
  
  onSubmit() {
    if (this.userForm.valid) {
      const formData = new FormData();
      Object.keys(this.userForm.value).forEach(key => {
        if (key !== 'avatar') {
          formData.append(key, this.userForm.value[key]);
        }
      });
  
      // Проверяем, есть ли файл перед добавлением
      const fileControl = this.userForm.get('avatar');
      if (fileControl && fileControl.value) {
        const file = fileControl.value;
        formData.append('avatar', file, file.name);
      }
  
      this.userFormService.createUser(formData)
    } else {
      console.error('Form is invalid');
    }
  }
  
}
