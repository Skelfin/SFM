import { Component, OnInit } from '@angular/core';
import { UserSidebarComponent } from "../../components/user-sidebar/user-sidebar.component";
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { MainAuthorsComponent } from "../../components/main/main-authors/main-authors.component";
import { MainAlbumsComponent } from "../../components/main/main-albums/main-albums.component";
import { MainPlaylistsComponent } from "../../components/main/main-playlists/main-playlists.component";
import { SearcherComponent } from "../../components/main/searcher/searcher.component";
import { SearchService } from '../../services/SearchService';
import { Subscription } from 'rxjs';
import { FoundTracksComponent } from "../../components/main/found-tracks/found-tracks.component";

@Component({
    selector: 'app-user-search',
    standalone: true,
    templateUrl: './user-search.component.html',
    styleUrl: './user-search.component.scss',
    imports: [UserSidebarComponent, HeaderComponent, FooterComponent, MainAuthorsComponent, MainAlbumsComponent, MainPlaylistsComponent, SearcherComponent, FoundTracksComponent]
})
export class UserSearchComponent implements OnInit {
    private searchTextSubscription!: Subscription;
    searchText: string = '';
  
    constructor(private searchService: SearchService) {}
  
    ngOnInit(): void {
      this.searchTextSubscription = this.searchService.getSearchText().subscribe(text => {
        this.searchText = text;
      });
    }
  
    ngOnDestroy(): void {
      this.searchTextSubscription.unsubscribe();
    }
  }
