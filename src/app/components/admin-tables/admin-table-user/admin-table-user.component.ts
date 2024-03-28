import { Component, OnInit  } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { AdminPopupUserComponent } from '../../admin-popup/admin-popup-user/admin-popup-user.component';
import { User } from '../../../types/user';
import { UserTableService } from '../../../services/user-table/user-table.service';
import { UserFormService } from '../../../services/user-table/user.form.service';
import { TruncatePipe } from "../../../truncate.pipe";
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
    selector: 'app-admin-table-user',
    standalone: true,
    templateUrl: './admin-table-user.component.html',
    styleUrl: './admin-table-user.component.scss',
    imports: [FontAwesomeModule, AdminPopupUserComponent, TruncatePipe, NgxPaginationModule],
})
export class AdminTablesUserComponent implements OnInit {
  currentPage = 1
  faTrash = faTrash
  faPenToSquare = faPenToSquare
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
  constructor(private userTableService: UserTableService, private userFormService: UserFormService, private readonly snackBar: MatSnackBar) { }

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

  deleteUser(userId: number) {
    this.userTableService.deleteUser(userId).subscribe(() => {
        this.snackBar.open('Пользователь удален', 'ОК', {
            duration: 3000,
        });
        this.loadUsers();
    });
}
}
