import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public base: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public page: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public last: BehaviorSubject<string> = new BehaviorSubject<string>('');

  formatDate(date: any): string {
    if (!date) return '';
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    };

    return new Date(date).toLocaleDateString('fr-FR', options);
  }
}
