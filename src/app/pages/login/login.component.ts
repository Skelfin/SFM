import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [HeaderComponent]
})
export class LoginComponent {

}
