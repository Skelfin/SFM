import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { API_URL } from '../constants/constants';
import { IAuthUser, ISignUpUser, IUser } from '../types/user';

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
        this.router.navigate(['/main']);
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

  private handleError(err: HttpErrorResponse): void {
    this.snackBar.open(err.error.message, 'OK', {
      duration: 3000,
    });
  }
}
