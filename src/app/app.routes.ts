import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home',
    },
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
