import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../types/user';
import { API_URL } from "../constants/constants";

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private apiUrl = `${API_URL}/user`

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}
