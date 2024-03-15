import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { RouterLink } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
    selector: 'app-signup',
    standalone: true,
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss',
    imports: [HeaderComponent, RouterLink, ReactiveFormsModule, FooterComponent]
})

export class SignupComponent {
    userData: FormGroup;

    constructor(private readonly authService: AuthService) {
        this.userData = new FormGroup({
            nickname: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
        });
    }

    onSubmit() {
        if (this.userData.valid) {
            this.authService.signUp(this.userData.value)
        } else {
            console.log("Form is not valid.");
        }
    }
}
