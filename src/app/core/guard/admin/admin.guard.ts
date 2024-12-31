import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard {
  constructor(private route: Router) {}
  canActivate(): boolean {
    if (!localStorage.getItem('token')) {
      this.route.navigate(['/auth/login']);
      return false;
    } else {
      return true;
    }
  }
}
