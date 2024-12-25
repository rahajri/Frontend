import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, tap, throwError } from 'rxjs';
import { routes } from '../../helpers/routes/routes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<any | null>(null);
  public checkAuth = new BehaviorSubject<boolean>(
    JSON.parse(localStorage.getItem('authenticated') || 'false')
  );
  private refreshTokenTimeout?: any;

  constructor(private router: Router, private http: HttpClient) {
    this.loadStoredUser();
  }

  get currentUser() {
    return this.currentUserSubject.value;
  }

  get isAuthenticated(): boolean {
    return !!this.currentUser;
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

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  public logout(): void {
    localStorage.clear();
    this.checkAuth.next(false);
    sessionStorage.clear();
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.currentUserSubject.next(null);
    this.stopRefreshTokenTimer();
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

  resendResetPasswordEmail(token: string) {
    return this.http.post<any>(`${this.baseUrl}/resend-reset-password-email`, {
      token,
    });
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http
      .post<any>(`${this.baseUrl}/refresh-token`, { refreshToken })
      .pipe(
        tap((tokens) => {
          localStorage.setItem('accessToken', tokens.accessToken);
          localStorage.setItem('refreshToken', tokens.refreshToken);
          this.startRefreshTokenTimer();
        })
      );
  }

  private handleAuthResponse(response:any): void {
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    this.currentUserSubject.next(response.user);
    this.startRefreshTokenTimer();
  }

  private loadStoredUser(): void {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        if (decoded) {
          this.currentUserSubject.next({
            id: decoded.sub,
            email: decoded.email,
            name: decoded.name,
          });
          this.startRefreshTokenTimer();
        }
      } catch {
        this.logout();
      }
    }
  }

  private startRefreshTokenTimer(): void {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decoded: any = jwtDecode(token);
      const expires = new Date(decoded.exp * 1000);
      const timeout = expires.getTime() - Date.now() - 60 * 1000; // Refresh 1 minute before expiry
      this.refreshTokenTimeout = setTimeout(
        () => this.refreshToken().subscribe(),
        timeout
      );
    }
  }

  private stopRefreshTokenTimer(): void {
    if (this.refreshTokenTimeout) {
      clearTimeout(this.refreshTokenTimeout);
    }
  }

  // isAuthenticated(): boolean {
  //   const token = localStorage.getItem('token'); // Or sessionStorage.getItem()
  //   if (!token) {
  //     return false; // No token means not authenticated
  //   }

  //   // Optionally, validate the token expiration
  //   try {
  //     const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
  //     const isExpired = Date.now() >= payload.exp * 1000; // Check expiration
  //     return !isExpired;
  //   } catch (e) {
  //     return false; // If token is invalid or cannot be parsed
  //   }
  // }
}
