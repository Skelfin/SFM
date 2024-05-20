// import { Component, OnInit } from '@angular/core';
// import { NgxAudioPlayerModule } from '@khajegan/ngx-audio-player';
// import { Track as NgxTrack } from '@khajegan/ngx-audio-player';   
// import { Track } from '../../types/track';
// import { TrackTableService } from '../../services/track-table.service';

// @Component({
//   selector: 'app-audio-player',
//   standalone: true,
//   imports: [NgxAudioPlayerModule],
//   templateUrl: './audio-player.component.html',
//   styleUrl: './audio-player.component.scss'
// })
// export class AudioPlayerComponent implements OnInit { 

//   msaapPageSizeOptions = [2, 4, 6];
//   msaapDisplayVolumeControls = true;
//   msaapDisplayRepeatControls = true;
//   msaapDisplayArtist = false;
//   msaapDisplayDuration = false;
//   msaapDisablePositionSlider = true;

//   // Your original playlist
//   originalPlaylist: Track[] = [];

//   // Material Style Advance Audio Player Playlist
//   msaapPlaylist: NgxTrack[] = [];

//   constructor(private trackTableService: TrackTableService) {
//   }
//   ngOnInit(): void {
//     this.loadTracks();
//   }

//   loadTracks(): void {
//     this.trackTableService.getTrack().subscribe(originalPlaylist => {
//       this.originalPlaylist = originalPlaylist;
//       this.msaapPlaylist = this.originalPlaylist.map(track => this.convertToNgxTrack(track));
//       // console.log(this.msaapPlaylist);
//     });
//   }

//   convertToNgxTrack(track: Track): NgxTrack {
//     console.log("Original track:", track);
//     const artist = track.album && track.album.authors ? 
//       track.album.authors.map(author => author.nickname).join(', ') : 'Unknown Artist';
//     const convertedTrack: NgxTrack = {
//       title: track.name,
//       link: `server/track_path/${track.path}`, // Добавлен базовый путь
//       artist: artist,
//       duration: track.duration ? this.convertDurationToSeconds(track.duration) : 0
//     };
//     console.log("Converted track:", convertedTrack);
//     return convertedTrack;
//   }

//   convertDurationToSeconds(duration: string): number {
//     if (!duration) {
//       return 0;
//     }
//     const parts = duration.split(':');
//     let seconds = 0;
//     if (parts.length === 2) {
//       seconds = (+parts[0]) * 60 + (+parts[1]);
//     } else if (parts.length === 3) {
//       seconds = (+parts[0]) * 3600 + (+parts[1]) * 60 + (+parts[2]);
//     }
//     return seconds;
//   }
// }
