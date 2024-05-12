import { Component, OnInit } from '@angular/core';
import { UserPopupComponent } from "../user-popup/user-popup.component";
import { UserTableService } from '../../../services/user-table/user-table.service';
import { UserFormService } from '../../../services/user-table/user.form.service';
import { User } from '../../../types/user';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { jwtDecode } from 'jwt-decode';

@Component({
    selector: 'app-user-info',
    standalone: true,
    templateUrl: './user-info.component.html',
    styleUrl: './user-info.component.scss',
    imports: [UserPopupComponent, FontAwesomeModule]
})
export class UserInfoComponent implements OnInit {
  faPen = faPen
  showModal: boolean = false;
  currentUser: User | null = null;

  openModal() {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.id) {
      this.userTableService.getUserById(decodedToken.id).subscribe(user => {
        this.showModal = true;
      });
    }
  }
  
  decodeToken(): any {
    const token = localStorage.getItem('token');
    return token ? jwtDecode(token) : null;
  }
  
  closeModal() {
    this.showModal = false;
    this.loadCurrentUser();
  }

  constructor(private userTableService: UserTableService, private userFormService: UserFormService) { }

  ngOnInit(): void {
    this.loadCurrentUser();
    this.userFormService.userCreated$.subscribe(() => {
      this.loadCurrentUser();
    });
  }

  loadCurrentUser() {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.id) {
      this.userTableService.getUserById(decodedToken.id).subscribe(user => {
        this.currentUser = user;
      });
    }
  }
}
