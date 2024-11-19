import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogGuard  {
  constructor(private route: Router) {}
  canActivate(
    // route: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot
    ): 
    Observable<boolean | UrlTree> | 
    Promise<boolean | UrlTree> 
    | boolean 
    | UrlTree {
        if (localStorage.getItem('blog')) {
          return true;
        } else {
          this.route.navigate(['/home']);
          return false;
        }
  }
  
}
