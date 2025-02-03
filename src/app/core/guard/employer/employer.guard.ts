import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { NavigationService } from '../../services/navigate.service';

@Injectable({
  providedIn: 'root',
})
export class EmployerGuard {
  constructor(
    private router: Router,
    private spinner: SpinnerService,
    private navigationService: NavigationService
  ) {}
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

    const previousUrl = this.navigationService.getPreviousUrl();

    const role = localStorage.getItem('role');
    if (role === 'company-employee') {
      return true;
    } else {
      this.spinner.hide();
      if (previousUrl) {
        this.router.navigateByUrl(previousUrl);
      } else {
        this.router.navigate(['/auth/login']);
      }
      return false;
    }
  }
}
