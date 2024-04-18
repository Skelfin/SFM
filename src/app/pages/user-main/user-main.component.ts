import { Component } from '@angular/core';
import { UserSidebarComponent } from "../../components/user-sidebar/user-sidebar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { MainPlaylistsUserComponent } from "../../components/main-playlists-user/main-playlists-user.component";
import { MainPlaylistsComponent } from "../../components/main-playlists/main-playlists.component";

@Component({
    selector: 'app-user-main',
    standalone: true,
    templateUrl: './user-main.component.html',
    styleUrl: './user-main.component.scss',
    imports: [UserSidebarComponent, FooterComponent, HeaderComponent, MainPlaylistsUserComponent, MainPlaylistsComponent]
})
export class UserMainComponent {

}
