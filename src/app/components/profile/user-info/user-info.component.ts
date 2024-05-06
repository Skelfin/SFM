import { Component } from '@angular/core';
import { UserPopupComponent } from "../user-popup/user-popup.component";
import { UserTableService } from '../../../services/user-table/user-table.service';
import { UserFormService } from '../../../services/user-table/user.form.service';
import { User } from '../../../types/user';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faPenToSquare, faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-user-info',
    standalone: true,
    templateUrl: './user-info.component.html',
    styleUrl: './user-info.component.scss',
    imports: [UserPopupComponent, FontAwesomeModule]
})
export class UserInfoComponent {
  faPen = faPen
  showModal: boolean = false;
  selectedUser: User | null = null;

  openModal(user: User) {
    this.showModal = true;
    this.selectedUser = user;
  }

  closeModal() {
    this.showModal = false;
    this.loadUsers();
  }
  constructor(private userTableService: UserTableService, private userFormService: UserFormService) { }

  users: User[] = [];

  ngOnInit(): void {
    this.loadUsers();

    this.userFormService.userCreated$.subscribe(() => {
      this.loadUsers();
    });
  }

  loadUsers(): void {
    this.userTableService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
}
