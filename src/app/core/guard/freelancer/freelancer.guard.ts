import { Injectable } from '@angular/core';
import { Router  } from '@angular/router';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FreelancerGuard  {
  constructor(private route: Router) {}
  // canActivate(
  //   // route: ActivatedRouteSnapshot,
  //   // state: RouterStateSnapshot
  //   ): 
  //   Observable<boolean | UrlTree> 
  //   | Promise<boolean | UrlTree> 
  //   | boolean | UrlTree 
  //   {
  //     if (localStorage.getItem('freelancer')) {
  //       return true;
  //     } else {
  //       this.route.navigate(['/home']);
  //       return false;
  //     }
  // }
  
}
