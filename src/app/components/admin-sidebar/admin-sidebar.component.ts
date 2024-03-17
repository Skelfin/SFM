import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUsers, faFolderOpen, faFolder, faMusic, faUserGroup } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.scss'
})
export class AdminSidebarComponent {
  faUsers = faUsers
  faFolderOpen = faFolderOpen
  faFolder = faFolder
  faMusic = faMusic
  faUserGroup = faUserGroup
}
