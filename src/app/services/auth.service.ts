// auth.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { API_URL } from '../constants/constants';
import { IAuthUser, ISignUpUser, IUser } from '../types/user';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthSig = this.isAuthenticated.asObservable();
  private currentUserSubject = new BehaviorSubject<IUser | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
  ) {
    const token = localStorage.getItem('token');
    this.isAuthenticated.next(!!token);
    if (token) {
      this.loadCurrentUser();
    }
  }

  private loadCurrentUser() {
    this.http.get<IUser>(`${API_URL}/auth/profile`).subscribe(user => {
      this.currentUserSubject.next(user);
    });
  }

  getCurrentUser(): Observable<IUser | null> {
    return this.currentUser$;
  }

  signUp(userData: ISignUpUser) {
    return this.http
      .post(`${API_URL}/user`, userData)
      .pipe(
        tap(() => {
          this.login(userData);
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
    return this.http
      .post<IUser>(`${API_URL}/auth/login`, userData)
      .pipe(
        tap((res: IUser) => {
          localStorage.setItem('token', res.token);
          this.isAuthenticated.next(true);
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
        this.router.navigate([' ']);
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated.next(false);
    this.router.navigate(['/']);
    this.snackBar.open('Успешный выход', 'OK', {
      duration: 3000,
    });
  }

  sendPasswordReset(email: string) {
    return this.http.post(`${API_URL}/user/send-password-reset`, { email })
      .pipe(
        tap(() => {
          this.snackBar.open('Письмо для сброса пароля отправлено', 'OK', {
            duration: 3000,
          });
        }),
        catchError(err => {
          this.handleError(err);
          throw new Error(err.message);
        })
      )
      .subscribe();
  }

  resetPassword(token: string, newPassword: string) {
    return this.http.post(`${API_URL}/user/reset-password`, { token, newPassword })
      .pipe(
        tap(() => {
          this.snackBar.open('Пароль успешно сброшен', 'OK', {
            duration: 3000,
          });
        }),
        catchError(err => {
          this.handleError(err);
          throw new Error(err.message);
        })
      )
      .subscribe(() => {
        this.router.navigate([' ']);
      });
  }

  private handleError(err: HttpErrorResponse): void {
    this.snackBar.open(err.error.message, 'OK', {
      duration: 3000,
    });
  }
  
  getToken() {
    return localStorage.getItem('token');
  }

  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      return null;
    }
  }

  hasAdminAccess(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const decodedToken = this.decodeToken(token);
    return decodedToken && decodedToken.access_rights && decodedToken.access_rights > 0;
  }

  hasRestrictedAdminAccess(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const decodedToken = this.decodeToken(token);
    return decodedToken && decodedToken.access_rights === 1;
  }
}
