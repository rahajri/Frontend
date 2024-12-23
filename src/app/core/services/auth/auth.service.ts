import { Injectable, signal } from '@angular/core';
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
  public currentUser = this.currentUserSubject.asObservable();
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
    return !!localStorage.getItem('token');
  }

  public logout(): void {
    localStorage.clear();
    this.currentUserSubject.next(null);
    this.checkAuth.next(false);
    sessionStorage.clear();
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

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token'); // Or sessionStorage.getItem()
    if (!token) {
      return false; // No token means not authenticated
    }

    // Optionally, validate the token expiration
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
      const isExpired = Date.now() >= payload.exp * 1000; // Check expiration
      return !isExpired;
    } catch (e) {
      return false; // If token is invalid or cannot be parsed
    }
  }
}
