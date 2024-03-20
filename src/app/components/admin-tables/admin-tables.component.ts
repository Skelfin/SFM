import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { AdminPopupComponent } from '../admin-popup/admin-popup.component';
import { User } from '../../types/user-table';
import { UserService } from '../../services/user-table.service';
import { TruncatePipe } from "../../truncate.pipe";
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
    selector: 'app-admin-tables',
    standalone: true,
    templateUrl: './admin-tables.component.html',
    styleUrl: './admin-tables.component.scss',
    imports: [FontAwesomeModule, AdminPopupComponent, TruncatePipe, NgxPaginationModule],
})
export class AdminTablesComponent implements OnInit {
  currentPage = 1
  faTrash = faTrash
  faPenToSquare = faPenToSquare
  path: string = this.router.url
  showModal: boolean = false;
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
  constructor(private router: Router, private userService: UserService) { }

  users: User[] = [];

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

}
