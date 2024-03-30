import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Playlist, PlaylistForm } from '../types/playlist';
import { API_URL } from "../constants/constants";
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class PlaylistTableService {
  private apiUrl = `${API_URL}/playlists`
  private playlistCreatedSubject = new Subject<void>();

  playlistCreated$ = this.playlistCreatedSubject.asObservable();

  constructor(private http: HttpClient, private readonly snackBar: MatSnackBar) { }

  getPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this.apiUrl);
  }

  updatePlaylist(id: number, playlistFormData: Partial<PlaylistForm>) {
    return this.http.put(`${API_URL}/playlists/${id}`, playlistFormData).subscribe(() => {
      this.playlistCreatedSubject.next();
      this.snackBar.open('Успешно обновлено', 'OK', {
        duration: 3000,
      });
    })
  }
}
