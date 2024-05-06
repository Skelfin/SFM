import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Playlist } from '../types/playlist';
import { API_URL } from '../constants/constants';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class PlaylistTableService {
  private apiUrl = `${API_URL}/playlists`;
  private playlistCreatedSubject = new Subject<void>();

  playlistCreated$ = this.playlistCreatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private readonly snackBar: MatSnackBar
  ) {}

  getPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this.apiUrl);
  }

  createPlaylist(userFormData: FormData) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    });
    return this.http
      .post(`${this.apiUrl}`, userFormData, { headers })
      .subscribe(() => {
        this.playlistCreatedSubject.next();
        this.snackBar.open('Успешно создано', 'OK', {
          duration: 3000,
        });
      });
  }

  updatePlaylist(playlistId: number, formData: FormData) {
    return this.http
      .put(`${API_URL}/playlists/${playlistId}`, formData)
      .subscribe(() => {
        this.playlistCreatedSubject.next();
        this.snackBar.open('Успешно обновлено', 'OK', {
          duration: 3000,
        });
      });
  }
  private getToken(): string {
    return localStorage.getItem('token') || '';
  }
  deletePlaylist(playlistId: number): Observable<any> {
    const url = `${this.apiUrl}/${playlistId}`;
    return this.http.delete(url);
  }
}
