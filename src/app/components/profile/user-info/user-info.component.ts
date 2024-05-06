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
  hover: boolean = false;
  faPen = faPen
  showModal: boolean = false;
  selectedUser: User | null = null;
  currentUser: User | null = null;

  openModal() {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.id) {
      this.userTableService.getUserById(decodedToken.id).subscribe(user => {
        this.selectedUser = user;
        this.showModal = true;
      });
    } else {
      console.error('Token is invalid or not present');
    }
  }
  
  decodeToken(): any {
    const token = localStorage.getItem('token');
    return token ? jwtDecode(token) : null;
  }
  
  closeModal() {
    this.showModal = false;
    this.loadUsers();
  }
  constructor(private userTableService: UserTableService, private userFormService: UserFormService) { }

  users: User[] = [];

  ngOnInit(): void {
    this.loadCurrentUser();
    this.userFormService.userCreated$.subscribe(() => {
      this.loadUsers();
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

  loadUsers(): void {
    this.userTableService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
}
