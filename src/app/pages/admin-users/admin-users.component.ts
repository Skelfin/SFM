import { Component } from '@angular/core';
import { AdminSidebarComponent } from "../../components/admin-sidebar/admin-sidebar.component";
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { AdminTablesComponent } from "../../components/admin-tables/admin-tables.component";
import { AdminFormComponent } from "../../components/admin-form/admin-form.component";


@Component({
    selector: 'app-admin-users',
    standalone: true,
    templateUrl: './admin-users.component.html',
    styleUrl: './admin-users.component.scss',
    imports: [AdminSidebarComponent, HeaderComponent, FooterComponent, AdminTablesComponent, AdminFormComponent]
})
export class AdminUsersComponent {

}
