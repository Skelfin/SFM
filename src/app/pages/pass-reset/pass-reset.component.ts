import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';

@Component({
    selector: 'app-pass-reset',
    standalone: true,
    templateUrl: './pass-reset.component.html',
    styleUrl: './pass-reset.component.scss',
    imports: [HeaderComponent, FooterComponent, ReactiveFormsModule]
})
export class PassResetComponent {
  resetForm: FormGroup;
  token!: string

  constructor(
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.resetForm = new FormGroup({
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      confirmPassword: new FormControl('', [Validators.required])
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.token = params.get('token') || '';
      if (!this.token) {
        this.router.navigate(['/']);
      }
    });
  }

  passwordMatchValidator: ValidatorFn = (formGroup: AbstractControl): { [key: string]: boolean } | null => {
    const newPassword = formGroup.get('newPassword');
    const confirmPassword = formGroup.get('confirmPassword');
    if (!newPassword || !confirmPassword) return null;
    return newPassword.value === confirmPassword.value ? null : { passwordMismatch: true };
  };

  onSubmit() {
    if (this.resetForm.valid) {
      this.authService.resetPassword(this.token, this.resetForm.value.newPassword)
      console.log(this.resetForm.value.newPassword)
  }
}
}
