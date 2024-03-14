import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { RouterLink, Router } from "@angular/router";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  dropdownOpen = false;
  faUser = faUser;
  constructor(public authService: AuthService, private router: Router) {}

  toggleDropdown(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  // Добавленный метод для проверки, находимся ли мы на странице логина
  get isAuthPage(): boolean {
    return this.router.url === '/login' || this.router.url === '/signup';
  }

  logout() {
    this.authService.logout();
  }

}
