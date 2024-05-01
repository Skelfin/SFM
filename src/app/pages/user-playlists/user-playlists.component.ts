import { Component } from '@angular/core';
import { UserSidebarComponent } from "../../components/user-sidebar/user-sidebar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { MainPlaylistsUserComponent } from "../../components/main/main-playlists-user/main-playlists-user.component";
import { MainPlaylistsComponent } from "../../components/main/main-playlists/main-playlists.component";
import { MainAlbumsComponent } from "../../components/main/main-albums/main-albums.component";
import { MainAuthorsComponent } from "../../components/main/main-authors/main-authors.component";
import { InfoComponent } from "../../components/user-playlist-album/info/info.component";

@Component({
    selector: 'app-user-playlists',
    standalone: true,
    templateUrl: './user-playlists.component.html',
    styleUrl: './user-playlists.component.scss',
    imports: [UserSidebarComponent, FooterComponent, HeaderComponent, MainPlaylistsUserComponent, MainPlaylistsComponent, MainAlbumsComponent, MainAuthorsComponent, InfoComponent]
})
export class UserPlaylistsComponent {

}
