import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-pass-reset-request',
    standalone: true,
    templateUrl: './pass-reset-request.component.html',
    styleUrl: './pass-reset-request.component.scss',
    imports: [HeaderComponent, FooterComponent, ReactiveFormsModule]
})
export class PassResetRequestComponent {
    resetRequestForm: FormGroup;

    constructor(private readonly authService: AuthService) {
        this.resetRequestForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
        });
    }

    onSubmit() {
        if (this.resetRequestForm.valid) {
            this.authService.sendPasswordReset(this.resetRequestForm.value.email)
        }
    }
}
