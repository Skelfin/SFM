import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { AdminSidebarComponent } from "../../components/admin-sidebar/admin-sidebar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { AdminTablesComponent } from "../../components/admin-tables/admin-tables.component";

@Component({
    selector: 'app-admin-playlists',
    standalone: true,
    templateUrl: './admin-playlists.component.html',
    styleUrl: './admin-playlists.component.scss',
    imports: [HeaderComponent, AdminSidebarComponent, FooterComponent, AdminTablesComponent]
})
export class AdminPlaylistsComponent {

}
