import { Component } from '@angular/core';
import { UserSidebarComponent } from "../../components/user-sidebar/user-sidebar.component";
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { AlbumInfoComponent } from "../../components/user-playlist-album/album-info/album-info.component";
import { TableAlbumComponent } from "../../components/user-playlist-album/table-album/table-album.component";

@Component({
    selector: 'app-album',
    standalone: true,
    templateUrl: './album.component.html',
    styleUrl: './album.component.scss',
    imports: [UserSidebarComponent, HeaderComponent, FooterComponent, AlbumInfoComponent, TableAlbumComponent]
})
export class AlbumComponent {

}
