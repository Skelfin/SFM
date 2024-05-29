import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { RouterLink } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [HeaderComponent, RouterLink, ReactiveFormsModule, FooterComponent]
})
export class LoginComponent {
    userData: FormGroup;

    constructor(private readonly authService: AuthService) {
        this.userData = new FormGroup({
            nickname: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
        });
    }

    onSubmit() {
        if (this.userData.valid) {
            this.authService.login(this.userData.value)
        }
    }
}
