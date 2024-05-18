import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { API_URL } from '../../constants/constants';
import { UserForm } from '../../types/user';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserFormService {
  private userCreatedSubject = new Subject<void>();

  userCreated$ = this.userCreatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private readonly snackBar: MatSnackBar
  ) {}

  createUser(userFormData: FormData) {
    return this.http
      .post(`${API_URL}/user-form`, userFormData)
      .pipe(
        catchError((err) => {
          this.handleError(err);
          throw new Error(err.message);
        })
      )
      .subscribe({
        next: () => {
          this.userCreatedSubject.next();
          this.snackBar.open('Успешно создано', 'OK', { duration: 3000 });
        },
        error: (error) => console.error('Error creating user', error),
      });
  }

  updateUser(id: number, userFormData: FormData | Partial<UserForm>) {
    return this.http.put(`${API_URL}/user-form/${id}`, userFormData)
      .pipe(
        catchError((err) => {
          this.handleError(err);
          throw new Error(err.message);
        })
      )
      .subscribe(() => {
        this.userCreatedSubject.next();
        this.snackBar.open('Успешно обновлено', 'OK', {
          duration: 3000,
        });
      });
  }

  private handleError(err: HttpErrorResponse): void {
    this.snackBar.open(err.error.message, 'OK', {
      duration: 3000,
    });
  }
}
