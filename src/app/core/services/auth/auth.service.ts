import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { routes } from '../../helpers/routes/routes';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any | null> = new BehaviorSubject(
    null
  );
  public currentUser$: Observable<any | null> =
    this.currentUserSubject.asObservable();
  public checkAuth: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('authenticated') || 'false'
  );

  constructor(private router: Router) {}

  setUser(user: any): void {
    this.currentUserSubject.next(user);
  }

  getUser(): any | null {
    return this.currentUserSubject.value;
  }
  public login(): void {
    this.checkAuth.next('true');
    this.router.navigate([routes.admin_dashboard]);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Check if the token exists
  }

  public logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('token'); // Remove the token
    this.checkAuth.next('false');
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate([routes.home]);
  }
}
