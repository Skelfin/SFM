import { Component, HostListener } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { RouterLink, Router } from "@angular/router";
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { AudioService } from '../../services/audio.service';
import { jwtDecode } from 'jwt-decode';
import { User } from '../../types/user';
import { UserTableService } from '../../services/user-table/user-table.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  dropdownOpen = false;
  faUser = faUser;
  currentUser: User | null = null;
  constructor(public authService: AuthService, private router: Router, private audioService: AudioService, private userTableService: UserTableService) {}

  toggleDropdown(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;
    if (targetElement && !targetElement.closest('.relative.z-50')) {
      this.closeDropdown();
    }
  }

  get isAuthPage(): boolean {
    const authPages = ['/login', '/signup', '/recovery'];
    const url = this.router.url;
    return authPages.some(page => url.includes(page)) || url.includes('/reset/password');
  }

  logout() {
    this.authService.logout();
    this.audioService.clearTrack();
  }
  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }

  decodeToken(): any {
    const token = localStorage.getItem('token');
    return token ? jwtDecode(token) : null;
  }

  loadCurrentUser() {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.id) {
      this.userTableService.getUserById(decodedToken.id).subscribe(user => {
        this.currentUser = user;
      });
    }
  }

  ngOnInit(): void {
    this.loadCurrentUser();
  }


}
