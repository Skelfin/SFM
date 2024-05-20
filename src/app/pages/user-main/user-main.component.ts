import { Component } from '@angular/core';
import { UserSidebarComponent } from "../../components/user-sidebar/user-sidebar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { MainPlaylistsComponent } from "../../components/main/main-playlists/main-playlists.component";
import { MainAlbumsComponent } from "../../components/main/main-albums/main-albums.component";
import { MainAuthorsComponent } from "../../components/main/main-authors/main-authors.component";
import { AudioPlayerComponent } from "../../components/audio-player/audio-player.component";

@Component({
    selector: 'app-user-main',
    standalone: true,
    templateUrl: './user-main.component.html',
    styleUrl: './user-main.component.scss',
    imports: [UserSidebarComponent, FooterComponent, HeaderComponent, MainPlaylistsComponent, MainAlbumsComponent, MainAuthorsComponent, AudioPlayerComponent]
})
export class UserMainComponent {

}
