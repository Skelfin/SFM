import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faMagnifyingGlass,
  faHouse,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { jwtDecode } from 'jwt-decode';
import { Playlist } from '../../types/playlist';
import { UserProfilePlaylistService } from '../../services/profile-playlist-user';
import { PluralPipe } from '../../pipes/plural.pipe';
import { UserCreatePlaylistPopupComponent } from '../user-create-playlist-popup/user-create-playlist-popup.component';
import { PlaylistTableService } from '../../services/playlist-table.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-sidebar',
  standalone: true,
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.scss',
  imports: [
    RouterLink,
    RouterLinkActive,
    FontAwesomeModule,
    PluralPipe,
    UserCreatePlaylistPopupComponent,
    CommonModule
  ],
})
export class UserSidebarComponent implements OnInit {
  faPlus = faPlus;
  faHouse = faHouse;
  faMagnifyingGlass = faMagnifyingGlass;
  showModal: boolean = false;

  playlists: Playlist[] = [];
  userId!: number;

  constructor(
    private UserProfilePlaylistService: UserProfilePlaylistService,
    private playlistTableService: PlaylistTableService
  ) {}

  ngOnInit(): void {
    this.loadUserPlaylists();
    this.playlistTableService.playlistCreated$.subscribe(() => {
      this.loadUserPlaylists();
    });
  }

  decodeToken(): any {
    const token = localStorage.getItem('token');
    return token ? jwtDecode(token) : null;
  }

  encodeId(id: number): string {
    const salt = 'Sec1t';
    const saltedId = `${salt}${id}${salt}`;
    return btoa(saltedId);
  }

  loadUserPlaylists() {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.id) {
      this.userId = decodedToken.id;
      this.UserProfilePlaylistService.getUserPlaylists(this.userId).subscribe(
        (playlists) => {
          this.playlists = playlists;
        }
      );
    }
  }

  openModal() {
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
    this.loadUserPlaylists();
  }
}
