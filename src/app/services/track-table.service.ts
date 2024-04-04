import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { API_URL } from '../constants/constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Track, TrackForm } from '../types/track';

@Injectable({
  providedIn: 'root',
})
export class TrackTableService {
  private apiUrl = `${API_URL}/tracks`;
  private trackCreatedSubject = new Subject<void>();

  trackCreated$ = this.trackCreatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private readonly snackBar: MatSnackBar
  ) {}

  getTrack(): Observable<Track[]> {
    return this.http.get<Track[]>(this.apiUrl);
  }
  createTrack(trackFormData: FormData) {
    return this.http.post(`${API_URL}/tracks`, trackFormData).subscribe(() => {
      this.trackCreatedSubject.next();
      this.snackBar.open('Успешно создано', 'OK', {
        duration: 3000,
      });
    });
  }

  updateTrack(id: number, trackFormData: FormData) {
    return this.http
      .put(`${API_URL}/tracks/${id}`, trackFormData)
      .subscribe(() => {
        this.trackCreatedSubject.next();
        this.snackBar.open('Успешно обновлено', 'OK', {
          duration: 3000,
        });
      });
  }

  deleteTrack(trackId: number): Observable<any> {
    const url = `${this.apiUrl}/${trackId}`;
    return this.http.delete(url);
  }
}
