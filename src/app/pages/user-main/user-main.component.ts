import { Component } from '@angular/core';
import { UserSidebarComponent } from "../../components/user-sidebar/user-sidebar.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
    selector: 'app-user-main',
    standalone: true,
    templateUrl: './user-main.component.html',
    styleUrl: './user-main.component.scss',
    imports: [UserSidebarComponent, FooterComponent]
})
export class UserMainComponent {

}
