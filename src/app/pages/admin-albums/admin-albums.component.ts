import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { AdminSidebarComponent } from "../../components/admin-sidebar/admin-sidebar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { AdminTableAlbumsComponent } from "../../components/admin-tables/admin-table-albums/admin-table-albums.component";
import { AdminFormAlbumsComponent } from "../../components/admin-form/admin-form-albums/admin-form-albums.component";

@Component({
    selector: 'app-admin-albums',
    standalone: true,
    templateUrl: './admin-albums.component.html',
    styleUrl: './admin-albums.component.scss',
    imports: [HeaderComponent, AdminSidebarComponent, FooterComponent, AdminTableAlbumsComponent, AdminFormAlbumsComponent]
})
export class AdminAlbumsComponent {

}
