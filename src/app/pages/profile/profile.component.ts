import { Component } from '@angular/core';
import { UserSidebarComponent } from "../../components/user-sidebar/user-sidebar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { UserInfoComponent } from "../../components/profile/user-info/user-info.component";
import { MainPlaylistsComponent } from "../../components/main/main-playlists/main-playlists.component";
import { UserProfilePlaylistsComponent } from "../../components/profile/user-playlists/user-playlists.component";
import { AudioPlayerComponent } from "../../components/audio-player/audio-player.component";

@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
    imports: [UserSidebarComponent, FooterComponent, HeaderComponent, UserInfoComponent, MainPlaylistsComponent, UserProfilePlaylistsComponent, AudioPlayerComponent]
})
export class ProfileComponent {

}
