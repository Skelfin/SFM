import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlaylistTableService } from '../../../services/playlist-table.service';

@Component({
  selector: 'app-admin-form-playlists',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-form-playlists.component.html',
  styleUrl: './admin-form-playlists.component.scss'
})
export class AdminFormPlaylistsComponent {
  playlistForm: FormGroup;
  constructor(private playlistTableService: PlaylistTableService) {
    this.playlistForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      avatar: new FormControl('')
    });
  }
  onSubmit() {
    if (this.playlistForm.valid) {
      this.playlistTableService.createPlaylist(this.playlistForm.value)
    }else {
      console.error('Form is invalid');
    }
  }
}

