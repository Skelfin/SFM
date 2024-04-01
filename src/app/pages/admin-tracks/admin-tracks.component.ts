import { Component } from '@angular/core';
import { AdminSidebarComponent } from "../../components/admin-sidebar/admin-sidebar.component";
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { AdminTableTracksComponent } from "../../components/admin-tables/admin-table-tracks/admin-table-tracks.component";
import { AdminFormTracksComponent } from "../../components/admin-form/admin-form-tracks/admin-form-tracks.component";

@Component({
    selector: 'app-admin-tracks',
    standalone: true,
    templateUrl: './admin-tracks.component.html',
    styleUrl: './admin-tracks.component.scss',
    imports: [AdminSidebarComponent, HeaderComponent, FooterComponent, AdminTableTracksComponent, AdminFormTracksComponent]
})
export class AdminTracksComponent {

}
