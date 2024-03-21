import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserForm } from '../types/user-form';
import { API_URL } from '../constants/constants';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private readonly snackBar: MatSnackBar) { }

  createUser(user: UserForm){
    return this.http.post(`${API_URL}/user-form`, user).subscribe(()=> {
        this.snackBar.open('Успешно создано', 'OK', {
            duration: 3000,
        });
    })
  }
}
