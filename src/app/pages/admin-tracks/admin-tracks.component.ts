import { Component } from '@angular/core';
import { AdminSidebarComponent } from "../../components/admin-sidebar/admin-sidebar.component";
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
    selector: 'app-admin-tracks',
    standalone: true,
    templateUrl: './admin-tracks.component.html',
    styleUrl: './admin-tracks.component.scss',
    imports: [AdminSidebarComponent, HeaderComponent, FooterComponent]
})
export class AdminTracksComponent {

}
