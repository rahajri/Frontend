import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { routes } from '../../helpers/routes/routes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject: BehaviorSubject<any | null> = new BehaviorSubject(
    null
  );
  public currentUser$: Observable<any | null> =
    this.currentUserSubject.asObservable();
  public checkAuth: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('authenticated') || 'false'
  );

  constructor(private router: Router, private http: HttpClient) {}

  setUser(user: any): void {
    this.currentUserSubject.next(user);
  }

  getUser(): any {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<any>(`${this.baseUrl}/login`, { email, password }, { headers })
      .pipe(
        map((user) => {
          if (user && user.accessToken && user.refreshToken) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            this.checkAuth.next('true');
          }
          return user;
        })
      );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Check if the token exists
  }

  public logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('token'); // Remove the token
    localStorage.removeItem('currentUser');
    this.checkAuth.next('false');
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate([routes.home]);
  }

  /**
   * Creates an authorization header
   */
  private createHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  checkPasswordToken(token: string) {
    return this.http.post<any>(`${this.baseUrl}/check-password-token`, {
      token,
    });
  }

  resetPassword(token: string, password: string) {
    return this.http.post<any>(`${this.baseUrl}/reset-password`, {
      token,
      password,
    });
  }
}
