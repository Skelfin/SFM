import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-signup',
    standalone: true,
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss',
    imports: [HeaderComponent, RouterLink]
})
export class SignupComponent {

}
