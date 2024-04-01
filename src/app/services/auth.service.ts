import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from "rxjs";
import { API_URL } from "../constants/constants";
import { IAuthUser, IUser } from "../types/user";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    isAuthSig = signal<boolean>(false)

    constructor(
        private readonly http: HttpClient,
        private readonly router: Router,
        private readonly snackBar: MatSnackBar
    ) { 
        const token = localStorage.getItem('token')
        this.isAuthSig.set(!!token)
     }

    signUp(userData: IAuthUser) {
        return this.http.post(`${API_URL}/user`, userData)
            .pipe(
                tap(()=> {
                    this.login(userData)
                }),
                catchError(err => {
                    this.handleError(err);
                    throw new Error(err.message);
                })
            )
            .subscribe(() => {
                this.snackBar.open('Успешно создано', 'OK', {
                    duration: 3000,
                });
            });
    }

    login(userData: IAuthUser) {
        return this.http.post<IUser>(`${API_URL}/auth/login`, userData)
            .pipe(tap((res: IUser) => {
                localStorage.setItem('token', res.token);
                this.isAuthSig.set(true);
            }),
            catchError(err => {
                this.handleError(err);
                throw new Error(err.message);
            })
            )
            .subscribe(() => {
                this.snackBar.open('Вход', 'OK', {
                    duration: 3000,
                });
                this.router.navigate(['/main']);
            });;
    }

    logout() {
        localStorage.removeItem('token');
        this.isAuthSig.set(false);
        this.router.navigate(['/']);
        this.snackBar.open('Успешный выход', 'OK', {
            duration: 3000,
        });
    }

    private handleError(err: HttpErrorResponse): void {
        this.snackBar.open(err.error.message, 'OK', {
            duration: 3000,
        });
    }
}
