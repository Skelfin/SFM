import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [HeaderComponent, RouterLink]
})
export class LoginComponent {

}
