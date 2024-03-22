import { Component, OnInit  } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { AdminPopupUserComponent } from '../../admin-popup/admin-popup-user/admin-popup-user.component';
import { User } from '../../../types/user';
import { UserTableService } from '../../../services/user-table.service';
import { UserFormService } from '../../../services/user.form.service';
import { TruncatePipe } from "../../../truncate.pipe";
import { NgxPaginationModule } from 'ngx-pagination';


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
    this.selectedUser = user; // Добавьте новое свойство selectedUser в классе компонента
  }

  closeModal() {
    this.showModal = false;
  }
  constructor(private userTableService: UserTableService, private userFormService: UserFormService) { }

  users: User[] = [];

  ngOnInit(): void {
    this.loadUsers();

    // Подписка на событие создания пользователя
    this.userFormService.userCreated$.subscribe(() => {
      this.loadUsers(); // Перезагрузка пользователей
    });
  }

  loadUsers(): void {
    this.userTableService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
}
