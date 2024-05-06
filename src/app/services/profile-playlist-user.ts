import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Playlist } from '../types/playlist';
import { API_URL } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class UserProfilePlaylistService {
    private apiUrl = `${API_URL}/playlists`;

  constructor(private http: HttpClient) { }

  getUserPlaylists(userId: number): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${this.apiUrl}/user/${userId}`);
  }
}
