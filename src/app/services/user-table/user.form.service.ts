import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { UserForm } from '../../types/user-form';
import { API_URL } from '../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class UserFormService {
  private userCreatedSubject = new Subject<void>();

  userCreated$ = this.userCreatedSubject.asObservable();

  constructor(private http: HttpClient, private readonly snackBar: MatSnackBar) { }

  createUser(user: UserForm) {
    return this.http.post(`${API_URL}/user-form`, user).subscribe(() => {
      this.userCreatedSubject.next();
      this.snackBar.open('Успешно создано', 'OK', {
        duration: 3000,
      });
    })
  }

  updateUser(id: number, userFormData: Partial<UserForm>){
    return this.http.put(`${API_URL}/user-form/${id}`, userFormData).subscribe(() => {
      this.userCreatedSubject.next();
      this.snackBar.open('Успешно обновлено', 'OK', {
        duration: 3000,
      });
    })
  }
}
