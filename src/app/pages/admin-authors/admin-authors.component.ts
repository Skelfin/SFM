import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { AdminSidebarComponent } from "../../components/admin-sidebar/admin-sidebar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { AdminTableAuthorsComponent } from "../../components/admin-tables/admin-table-authors/admin-table-authors.component";
import { AdminFormAuthorsComponent } from "../../components/admin-form/admin-form-authors/admin-form-authors.component";

@Component({
    selector: 'app-admin-authors',
    standalone: true,
    templateUrl: './admin-authors.component.html',
    styleUrl: './admin-authors.component.scss',
    imports: [HeaderComponent, AdminSidebarComponent, FooterComponent, AdminTableAuthorsComponent, AdminFormAuthorsComponent]
})
export class AdminAuthorsComponent {

}
