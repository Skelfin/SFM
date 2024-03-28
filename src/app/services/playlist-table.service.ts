import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Playlist } from '../types/playlist';
import { API_URL } from "../constants/constants";

@Injectable({
  providedIn: 'root'
})
export class PlaylistTableService {
    private apiUrl = `${API_URL}/playlists`

  constructor(private http: HttpClient) { }

  getPlaylists(): Observable<Playlist[]> { 
    return this.http.get<Playlist[]>(this.apiUrl);
  }
}
