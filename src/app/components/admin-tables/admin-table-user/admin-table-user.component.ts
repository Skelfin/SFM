import { Component, OnInit  } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { AdminPopupUserComponent } from '../../admin-popup/admin-popup-user/admin-popup-user.component';
import { User } from '../../../types/user';
import { UserService } from '../../../services/user-table.service';
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
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
  constructor(private userService: UserService) { }

  users: User[] = [];

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

}
