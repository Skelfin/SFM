import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUsers, faFolderOpen, faFolder, faMusic, faUserGroup, faMagnifyingGlass, faHouse, faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule],
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.scss'
})
export class UserSidebarComponent {
  faHeart = faHeart
  faHouse = faHouse
  faMagnifyingGlass = faMagnifyingGlass
  faUsers = faUsers
  faFolderOpen = faFolderOpen
  faFolder = faFolder
  faMusic = faMusic
  faUserGroup = faUserGroup
  playlists = [
    {
      id: 1,
      name: 'Название плейлиста 1',
      tracks: 10,
      author: 'Автор 1',
      imageUrl: '../assets/1.png'
    },
    {
      id: 2,
      name: 'Название плейлиста 2 dasdsasd',
      tracks: 8,
      author: 'Автор 2',
      imageUrl: '../assets/Home.jpg'
    },
    {
      id: 3,
      name: 'Название плейлиста 2 dasdsasd',
      tracks: 8,
      author: 'Автор 2',
      imageUrl: '../assets/Home.jpg'
    },
    // {
    //   id: 4,
    //   name: 'Название плейлиста 2 dasdsasd',
    //   tracks: 8,
    //   author: 'Автор 2',
    //   imageUrl: '../assets/Home.jpg'
    // },
    // {
    //   id: 5,
    //   name: 'Название плейлиста 2 dasdsasd',
    //   tracks: 8,
    //   author: 'Автор 2',
    //   imageUrl: '../assets/Home.jpg'
    // },
    // {
    //   id: 6,
    //   name: 'Название плейлиста 2 dasdsasd',
    //   tracks: 8,
    //   author: 'Автор 2',
    //   imageUrl: '../assets/Home.jpg'
    // },
    // {
    //   id: 7,
    //   name: 'Название плейлиста 2 dasdsasd',
    //   tracks: 8,
    //   author: 'Автор 2',
    //   imageUrl: '../assets/Home.jpg'
    // },
    // {
    //   id: 8,
    //   name: 'Название плейлиста 2 dasdsasd',
    //   tracks: 8,
    //   author: 'Автор 2',
    //   imageUrl: '../assets/Home.jpg'
    // },
    // {
    //   id: 9,
    //   name: 'Название плейлиста 2 dasdsasd',
    //   tracks: 8,
    //   author: 'Автор 2',
    //   imageUrl: '../assets/Home.jpg'
    // },
    // {
    //   id: 10,
    //   name: 'Название плейлиста 2 dasdsasd',
    //   tracks: 8,
    //   author: 'Автор 2',
    //   imageUrl: '../assets/Home.jpg'
    // },
    // {
    //   id: 11,
    //   name: 'Название плейлиста 2 dasdsasd',
    //   tracks: 8,
    //   author: 'Автор 2',
    //   imageUrl: '../assets/Home.jpg'
    // },
    // {
    //   id: 12,
    //   name: 'Название плейлиста 2 dasdsasd',
    //   tracks: 8,
    //   author: 'Автор 2',
    //   imageUrl: '../assets/Home.jpg'
    // },
    // {
    //   id: 13,
    //   name: 'Название плейлиста 2 dasdsasd',
    //   tracks: 8,
    //   author: 'Автор 2',
    //   imageUrl: '../assets/Home.jpg'
    // },
    // {
    //   id: 14,
    //   name: 'Название плейлиста 2 dasdsasd',
    //   tracks: 8,
    //   author: 'Автор 2',
    //   imageUrl: '../assets/Home.jpg'
    // },
    // {
    //   id: 15,
    //   name: 'Название плейлиста 2 dasdsasd',
    //   tracks: 8,
    //   author: 'Автор 2',
    //   imageUrl: '../assets/Home.jpg'
    // },

]
}
