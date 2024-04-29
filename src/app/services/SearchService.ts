import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchText = new BehaviorSubject<string>('');

  setSearchText(text: string): void {
    this.searchText.next(text);
  }

  clearSearchText(): void {
    this.searchText.next('');
  }

  getSearchText(): Observable<string> {
    return this.searchText.asObservable().pipe(
      debounceTime(200)
    );
  }
}
