import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupManagerAudioPlayerService {
  private currentPopupSource = new BehaviorSubject<number | null>(null);
  currentPopup$ = this.currentPopupSource.asObservable();

  openPopup(id: number): void {
    this.currentPopupSource.next(id);
  }

  closePopup(): void {
    this.currentPopupSource.next(null);
  }

  getCurrentPopup(): number | null {
    return this.currentPopupSource.value;
  }
}
