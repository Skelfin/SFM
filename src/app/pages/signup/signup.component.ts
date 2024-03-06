import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
    selector: 'app-signup',
    standalone: true,
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss',
    imports: [HeaderComponent]
})
export class SignupComponent {

}
