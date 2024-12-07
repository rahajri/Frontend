import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateGuard {
  constructor(private router: Router) {}
  canActivate(): // route: ActivatedRouteSnapshot,
  // state: RouterStateSnapshot
  boolean {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
