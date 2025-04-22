import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, map, Observable, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<any | null>(null);
  public checkAuth = new BehaviorSubject<boolean>(
    JSON.parse(localStorage.getItem('authenticated') || 'false')
  );
  public isLoggedIn: boolean = !!localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  get currentUser() {
    return this.currentUserSubject.value;
  }

  get isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

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

  isLogged(): boolean {
    return !!localStorage.getItem('token');
  }
  isEmployer(): boolean {
    return localStorage.getItem('role') === 'company-employee' ? true : false;
  }

  setIsLoggedIn(loggeIn: boolean): void {
    this.isLoggedIn = loggeIn;
  }

  public logout(): void {
    this.checkAuth.next(false);
    sessionStorage.clear();
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('userProfile');
    localStorage.removeItem('refreshToken');
    this.currentUserSubject.next(null);
    this.setIsLoggedIn(false);
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
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
  validateToken() {
    return this.http.post<any>(`${this.baseUrl}/validate-token`, {});
  }

  resendResetPasswordEmail(token: string) {
    return this.http.post<any>(`${this.baseUrl}/resend-reset-password-email`, {
      token,
    });
  }
}
