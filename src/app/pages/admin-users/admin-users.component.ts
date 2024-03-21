import { Component } from '@angular/core';
import { AdminSidebarComponent } from "../../components/admin-sidebar/admin-sidebar.component";
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { AdminTablesUserComponent } from "../../components/admin-tables/admin-table-user/admin-table-user.component";
import { AdminFormUserComponent } from "../../components/admin-form/admin-form-user/admin-form-user.component";


@Component({
    selector: 'app-admin-users',
    standalone: true,
    templateUrl: './admin-users.component.html',
    styleUrl: './admin-users.component.scss',
    imports: [AdminSidebarComponent, HeaderComponent, FooterComponent, AdminTablesUserComponent, AdminFormUserComponent]
})
export class AdminUsersComponent {

}
