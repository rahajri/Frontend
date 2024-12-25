import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isLoggedIn = localStorage.getItem('token'); // Replace with your actual logic
    if (!isLoggedIn) {
      return this.router.createUrlTree(['/auth/login']);
    }
    return true;
  }

  // constructor(private router: Router) {}
  // canActivate(): boolean {
  //   const isAuthenticated = !!localStorage.getItem('token');
  //   if (!isAuthenticated) {
  //     this.router.navigate(['/auth/login']);
  //     return false;
  //   }
  //   return true;
  // }
}
