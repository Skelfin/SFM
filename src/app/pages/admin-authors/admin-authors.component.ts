import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { AdminSidebarComponent } from "../../components/admin-sidebar/admin-sidebar.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
    selector: 'app-admin-authors',
    standalone: true,
    templateUrl: './admin-authors.component.html',
    styleUrl: './admin-authors.component.scss',
    imports: [HeaderComponent, AdminSidebarComponent, FooterComponent]
})
export class AdminAuthorsComponent {

}
