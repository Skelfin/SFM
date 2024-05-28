import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { authGuard } from './guards/auth.guard';
import { AdminUsersComponent } from './pages/admin-users/admin-users.component';
import { AdminTracksComponent } from './pages/admin-tracks/admin-tracks.component';
import { AdminPlaylistsComponent } from './pages/admin-playlists/admin-playlists.component';
import { AdminAlbumsComponent } from './pages/admin-albums/admin-albums.component';
import { AdminAuthorsComponent } from './pages/admin-authors/admin-authors.component';
import { UserMainComponent } from './pages/user-main/user-main.component';
import { UserSearchComponent } from './pages/user-search/user-search.component';
import { UserPlaylistsComponent } from './pages/user-playlists/user-playlists.component';
import { AlbumComponent } from './pages/album/album.component';
import { AuthorsComponent } from './pages/authors/authors.component';

export const routes: Routes = [
    // {
    //     path: 'Home',
    //     component: HomeComponent,
    //     title: 'Home',
    // },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login',
    },
    {
        path: 'signup',
        component: SignupComponent,
        title: 'Signup',
    },
    {
        path: '',
        component: UserMainComponent,
        title: 'Главная',
    },
    {
        path: 'search',
        component: UserSearchComponent,
        title: 'Поиск',
    },    
    {
        path: 'playlist/:id',
        component: UserPlaylistsComponent,
        title: 'Плейлист',
    },
    {
        path: 'album/:id',
        component: AlbumComponent,
        title: 'Альбом',
    },
    {
        path: 'author/:id',
        component: AuthorsComponent,
        title: 'Автор',
    },
    {
        path: 'admin/users',
        component: AdminUsersComponent,
        title: 'Пользователи',
    },
    {
        path: 'admin/tracks',
        component: AdminTracksComponent,
        title: 'Треки',
    },
    {
        path: 'admin/playlists',
        component: AdminPlaylistsComponent,
        title: 'Плейлисты',
    },
    {
        path: 'admin/albums',
        component: AdminAlbumsComponent,
        title: 'Альбомы',
    },
    {
        path: 'admin/authors',
        component: AdminAuthorsComponent,
        title: 'Авторы',
    },
    {
        path: 'profile',
        component: ProfileComponent,
        title: 'Profile',
        canActivate: [authGuard()]
    },
    {
        path: '**',
        component: HomeComponent,
        redirectTo:'',
    },
];
