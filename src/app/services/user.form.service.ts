import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserForm } from '../types/user-form';
import { API_URL } from '../constants/constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userCreated = new Subject<void>(); // Создаем Subject

  constructor(private http: HttpClient, private readonly snackBar: MatSnackBar) { }

  createUser(user: UserForm){
    return this.http.post(`${API_URL}/user-form`, user).subscribe(() => {
      this.userCreated.next(); // Испускаем значение после успешного создания пользователя
    })
  }
}
