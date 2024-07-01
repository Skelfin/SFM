import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { authGuard, guestGuard, adminGuard, restrictedAdminGuard, profileGuard } from './guards/auth.guard';
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
import { RouteGuardService } from './services/audio-stop-guard.service';
import { PassResetRequestComponent } from './pages/pass-reset-request/pass-reset-request.component';
import { PassResetComponent } from './pages/pass-reset/pass-reset.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        title: 'Авторизация',
        canActivate: [RouteGuardService, guestGuard()] 
    },
    {
        path: 'signup',
        component: SignupComponent,
        title: 'Регистрация',
        canActivate: [RouteGuardService, guestGuard()] 
    },
    {
        path: 'recovery',
        component: PassResetRequestComponent,
        title: 'Восстановление пароля',
        canActivate: [RouteGuardService, guestGuard()] 
    },
    {
        path: 'reset/password/:token',
        component: PassResetComponent,
        title: 'Сброс пароля',
        canActivate: [RouteGuardService, guestGuard()]
    },
    {
        path: '',
        component: UserMainComponent,
        title: 'Главная',
        canActivate: [authGuard()]
    },
    {
        path: 'search',
        component: UserSearchComponent,
        title: 'Поиск',
        canActivate: [authGuard()]
    },    
    {
        path: 'playlist/:id',
        component: UserPlaylistsComponent,
        title: 'Плейлист',
        canActivate: [authGuard()]
    },
    {
        path: 'album/:id',
        component: AlbumComponent,
        title: 'Альбом',
        canActivate: [authGuard()]
    },
    {
        path: 'author/:id',
        component: AuthorsComponent,
        title: 'Автор',
        canActivate: [authGuard()]
    },
    {
        path: 'admin/users',
        component: AdminUsersComponent,
        title: 'Пользователи',
        canActivate: [RouteGuardService, adminGuard()] 
    },
    {
        path: 'admin/tracks',
        component: AdminTracksComponent,
        title: 'Треки',
        canActivate: [RouteGuardService, adminGuard()]
    },
    {
        path: 'admin/playlists',
        component: AdminPlaylistsComponent,
        title: 'Плейлисты',
        canActivate: [RouteGuardService, adminGuard()]
    },
    {
        path: 'admin/albums',
        component: AdminAlbumsComponent,
        title: 'Альбомы',
        canActivate: [RouteGuardService, adminGuard()]
    },
    {
        path: 'admin/authors',
        component: AdminAuthorsComponent,
        title: 'Авторы',
        canActivate: [RouteGuardService, adminGuard()]
    },
    {
        path: 'profile',
        component: ProfileComponent,
        title: 'Profile',
        canActivate: [profileGuard()]
    },
    {
        path: '**',
        component: HomeComponent,
        redirectTo: '',
    },
];