import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-admin-tables',
    standalone: true,
    templateUrl: './admin-tables.component.html',
    styleUrl: './admin-tables.component.scss',
    imports: [FontAwesomeModule]
})
export class AdminTablesComponent {
  faTrash = faTrash
  faPenToSquare = faPenToSquare
  constructor(private router: Router) {}
  path: string = this.router.url
}
