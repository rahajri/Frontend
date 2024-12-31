import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard {
  constructor(private route: Router) {}
  canActivate(): boolean {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      this.route.navigate(['/auth/login']);
      return false;
    } else {
      return true;
    }
  }
}
