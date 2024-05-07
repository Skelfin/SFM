import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural',
  standalone: true
})
export class PluralPipe implements PipeTransform {
  transform(value: number, titles: string[]): string {
    const cases = [2, 0, 1, 1, 1, 2];
    const index = (value % 100 > 4 && value % 100 < 20) ? 2 : cases[(value % 10 < 5) ? value % 10 : 5];
    return titles[index];
  }
}
