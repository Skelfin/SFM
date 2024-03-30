import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { AdminSidebarComponent } from "../../components/admin-sidebar/admin-sidebar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { AdminTablePlaylistsComponent } from "../../components/admin-tables/admin-table-playlists/admin-table-playlists.component";
import { AdminFormPlaylistsComponent } from "../../components/admin-form/admin-form-playlists/admin-form-playlists.component";


@Component({
    selector: 'app-admin-playlists',
    standalone: true,
    templateUrl: './admin-playlists.component.html',
    styleUrl: './admin-playlists.component.scss',
    imports: [HeaderComponent, AdminSidebarComponent, FooterComponent, AdminTablePlaylistsComponent, AdminFormPlaylistsComponent]
})
export class AdminPlaylistsComponent {

}
