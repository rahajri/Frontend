import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateGuard  {
  constructor(private router: Router) {}
  canActivate(
    // route: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot
    ): 
    Observable<boolean 
    | UrlTree> 
    | Promise<boolean 
    | UrlTree> 
    | boolean 
    | UrlTree {
     if (localStorage.getItem('auth')) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
  
}
