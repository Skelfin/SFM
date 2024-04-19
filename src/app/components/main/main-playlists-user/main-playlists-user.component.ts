import { Component, OnInit } from '@angular/core';

interface MusicCard {
  id: number
  title: string;
  image: string;
}

@Component({
  selector: 'app-main-playlists-user',
  standalone: true,
  imports: [],
  templateUrl: './main-playlists-user.component.html',
  styleUrl: './main-playlists-user.component.scss'
})
export class MainPlaylistsUserComponent implements OnInit {
  private musicCards: MusicCard[] = [
    { id: 1, title: 'Return', image: '../assets/Home.jpg' },
    { id: 2, title: 'Radar новинок asdadaывфвфывфывыф dasdasdasdadad dsadasdsa', image: '../assets/Home.jpg' },
    { id: 3, title: 'Return2', image: '../assets/Home.jpg' },
    { id: 4, title: 'Return3', image: '../assets/Home.jpg' },
    { id: 5, title: 'Return4', image: '../assets/Home.jpg' },
    { id: 6, title: 'Return5', image: '../assets/Home.jpg' },
    { id: 7, title: 'Return6', image: '../assets/Home.jpg' },
    { id: 8, title: 'Return7', image: '../assets/Home.jpg' },
    { id: 9, title: 'Return8', image: '../assets/Home.jpg' },
  ];
  shuffledMusicCards: MusicCard[] = [];

  ngOnInit(): void {
    this.shuffledMusicCards = this.shuffleMusicCards();
  }

  shuffleMusicCards(): any[] {
    // Копируем массив
    let array = [...this.musicCards];
    // Перемешиваем массив
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    // Возвращаем до 8 элементов
    return array.slice(0, 8);
  }
}
