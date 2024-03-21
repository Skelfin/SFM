import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { AdminSidebarComponent } from "../../components/admin-sidebar/admin-sidebar.component";
import { FooterComponent } from "../../components/footer/footer.component";


@Component({
    selector: 'app-admin-playlists',
    standalone: true,
    templateUrl: './admin-playlists.component.html',
    styleUrl: './admin-playlists.component.scss',
    imports: [HeaderComponent, AdminSidebarComponent, FooterComponent]
})
export class AdminPlaylistsComponent {

}
