import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { RouterLink } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';

@Component({
    selector: 'app-signup',
    standalone: true,
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss',
    imports: [HeaderComponent, RouterLink, ReactiveFormsModule ]
})

export class SignupComponent {
    userData: FormGroup;

    constructor() {
        this.userData = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
        });
    }

    onSubmit() {
        if (this.userData.valid) {
            console.log(this.userData.value);
        } else {
            console.log("Form is not valid.");
        }
    }
}
