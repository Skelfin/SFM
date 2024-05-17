import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { API_URL } from '../constants/constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Author } from '../types/author';

@Injectable({
  providedIn: 'root',
})
export class AuthorTableService {
  private apiUrl = `${API_URL}/author`;
  private authorCreatedSubject = new Subject<void>();

  authorCreated$ = this.authorCreatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private readonly snackBar: MatSnackBar
  ) {}

  getAuthor(): Observable<Author[]> {
    return this.http.get<Author[]>(this.apiUrl);
  }

  getAuthorById(id: number): Observable<Author> {
    return this.http.get<Author>(`${this.apiUrl}/${id}`);
  }

  createAuthor(authorFormData: FormData) {
    return this.http.post(`${API_URL}/author`, authorFormData).subscribe(() => {
      this.authorCreatedSubject.next();
      this.snackBar.open('Успешно создано', 'OK', {
        duration: 3000,
      });
    });
  }

  updateAuthor(id: number, authorFormData: FormData) {
    return this.http
      .put(`${API_URL}/author/${id}`, authorFormData)
      .subscribe(() => {
        this.authorCreatedSubject.next();
        this.snackBar.open('Успешно обновлено', 'OK', {
          duration: 3000,
        });
      });
  }

  deleteAuthor(authorId: number): Observable<any> {
    const url = `${this.apiUrl}/${authorId}`;
    return this.http.delete(url);
  }
}
