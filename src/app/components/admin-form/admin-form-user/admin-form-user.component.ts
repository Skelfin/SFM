import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserFormService } from '../../../services/user.form.service';

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
  onSubmit() {
    if (this.userForm.valid) {
      const formValue = {
        ...this.userForm.value,
        access_rights: Number(this.userForm.value.access_rights),
      };
      this.userFormService.createUser(this.userForm.value)
    } else {
      console.error('Form is invalid');
    }
  }
}
