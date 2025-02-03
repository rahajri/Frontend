import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private previousUrl: string | null = null;

  setPreviousUrl(url: string): void {
    localStorage.setItem('prevURL', url);
    this.previousUrl = url;
  }

  getPreviousUrl(): string | null {
    const url = localStorage.getItem('prevURL');
    return url;
  }
}
