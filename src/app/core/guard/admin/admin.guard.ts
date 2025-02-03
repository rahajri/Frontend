import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { NavigationService } from '../../services/navigate.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private navigationService: NavigationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const role = localStorage.getItem('role');
    const previousUrl = this.navigationService.getPreviousUrl();

    if (role === 'admin') {
      return true;
    } else {
      if (previousUrl) {
        this.router.navigateByUrl(previousUrl);
      } else {
        this.router.navigate(['/auth/login']);
      }
      return false;
    }
  }
}
