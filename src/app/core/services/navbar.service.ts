import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  public toogleSidebar: BehaviorSubject<'true' | 'false'> = new BehaviorSubject<'true' | 'false'>(
    localStorage.getItem('sidebarPosition') as 'true' | 'false'
  );
 
  public openSidebar(): void {
    // to set sidebar position app component html using "menu-opened" class
    if (localStorage.getItem('sidebarPosition')) {
      localStorage.removeItem('sidebarPosition');
      this.toogleSidebar.next('false');
    } else {
      localStorage.setItem('sidebarPosition', 'true');
      this.toogleSidebar.next('true');
    }
  }

  public closeSidebar(): void {
    // hide sidebar
    this.toogleSidebar.next('false');
    localStorage.removeItem('sidebarPosition');
  }
}
