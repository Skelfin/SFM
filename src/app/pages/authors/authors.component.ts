import { Component } from '@angular/core';
import { UserSidebarComponent } from "../../components/user-sidebar/user-sidebar.component";
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { AuthorInfoComponent } from "../../components/author/author-info/author-info.component";
import { AuthorDescriptionComponent } from "../../components/author/author-description/author-description.component";
import { FoundTracksComponent } from "../../components/main/found-tracks/found-tracks.component";
import { AuthorAlbumsComponent } from "../../components/author/author-albums/author-albums.component";

@Component({
    selector: 'app-authors',
    standalone: true,
    templateUrl: './authors.component.html',
    styleUrl: './authors.component.scss',
    imports: [UserSidebarComponent, HeaderComponent, FooterComponent, AuthorInfoComponent, AuthorDescriptionComponent, FoundTracksComponent, AuthorAlbumsComponent]
})
export class AuthorsComponent {

}
