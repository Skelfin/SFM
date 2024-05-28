import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupManagerService {
  private currentPopupSubject = new BehaviorSubject<number | null>(null);
  currentPopup$ = this.currentPopupSubject.asObservable();

  getCurrentPopup(): number | null {
    return this.currentPopupSubject.value;
  }

  openPopup(trackId: number): void {
    this.currentPopupSubject.next(trackId);
  }

  closePopup(): void {
    this.currentPopupSubject.next(null);
  }
}
