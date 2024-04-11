import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { API_URL } from '../constants/constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Album } from '../types/album';

@Injectable({
  providedIn: 'root',
})
export class AlbumTableService {
  private apiUrl = `${API_URL}/albums`;
  private albumCreatedSubject = new Subject<void>();

  albumCreated$ = this.albumCreatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private readonly snackBar: MatSnackBar
  ) {}

  getAlbum(): Observable<Album[]> {
    return this.http.get<Album[]>(this.apiUrl);
  }

  createAlbum(albumFormData: FormData) {
    return this.http.post(`${API_URL}/albums`, albumFormData).subscribe(() => {
      this.albumCreatedSubject.next();
      this.snackBar.open('Успешно создано', 'OK', {
        duration: 3000,
      });
    });
  }

  updateAlbum(id: number, albumFormData: FormData) {
    return this.http
      .put(`${API_URL}/albums/${id}`, albumFormData)
      .subscribe(() => {
        this.albumCreatedSubject.next();
        this.snackBar.open('Успешно обновлено', 'OK', {
          duration: 3000,
        });
      });
  }

  deleteAlbum(albumId: number): Observable<any> {
    const url = `${this.apiUrl}/${albumId}`;
    return this.http.delete(url);
  }
}
