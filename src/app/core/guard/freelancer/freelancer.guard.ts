import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { NavigationService } from '../../services/navigate.service';

@Injectable({
  providedIn: 'root',
})
export class CandidateGuard {
  constructor(
    private router: Router,
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
    const role = localStorage.getItem('role');
    const previousUrl = this.navigationService.getPreviousUrl();

    if (
      state.url.includes('project-list') ||
      state.url.includes('project-details')
    ) {
      return true;
    }

    if (role === 'candidate') {
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
