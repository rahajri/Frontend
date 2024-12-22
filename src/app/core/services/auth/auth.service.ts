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
  private currentUserSubject = new BehaviorSubject<any | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  public checkAuth = new BehaviorSubject<boolean>(
    JSON.parse(localStorage.getItem('authenticated') || 'false')
  );

  constructor(private router: Router, private http: HttpClient) {}

  setUser(user: any): void {
    this.currentUserSubject.next(user);
  }

  getUser(): any {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(
        `${this.baseUrl}/login`,
        { email, password },
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        }
      )
      .pipe(
        map((user) => {
          if (user?.accessToken && user?.refreshToken) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('token', user.accessToken);
            this.currentUserSubject.next(user);
            this.checkAuth.next(true);
          }
          return user;
        })
      );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Check if the token exists
  }

  public logout(): void {
    this.clearSession();
    this.router.navigate([routes.home]);
  }

  checkPasswordToken(token: string): Observable<any> {
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

  private clearSession(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    localStorage.setItem('authenticated', 'false');
    this.checkAuth.next(false);
    sessionStorage.clear();
  }
}
