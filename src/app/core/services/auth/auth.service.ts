import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { routes } from '../../helpers/routes/routes';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public checkAuth: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('authenticated') || "false"
  );

  constructor(private router: Router) {}

  public login(): void {
    this.checkAuth.next('true');
    localStorage.setItem('authenticated', 'true');
    this.router.navigate([routes.admin_dashboard]);
  }
  public logout(): void {
    this.router.navigate([routes.admin_login]);
    this.checkAuth.next("false");
    localStorage.clear();
    sessionStorage.clear();
  }
}
