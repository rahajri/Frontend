import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SpinnerService } from '../../services/spinner/spinner.service';

@Injectable({
  providedIn: 'root',
})
export class EmployerGuard {
  constructor(private route: Router, private spinner: SpinnerService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Check if the route is 'change-password'
    if (state.url.includes('change-password')) {
      return true;
    }

    const role = localStorage.getItem('role');
    if (role === 'company-employee') {
      return true;
    } else {
      this.route.navigate(['/home']);
      this.spinner.hide();
      return false;
    }
  }
}
