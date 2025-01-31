import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Profile } from 'src/app/core/models/models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = `${environment.apiUrl}/auth`;
  constructor(private http: HttpClient, private router: Router) {}
  private apiUrl = `${environment.apiUrl}/users`;

  // Register new user
  createUser(userData: any): Observable<any> {
    const url = `${this.baseUrl}/register`;
    return this.http.post<any>(url, userData);
  }

  // Login
  login(email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/login`;
    const body = { email, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(url, body, { headers });
  }

  // Verify OTP with Bearer token
  verifyOtp(userId: string): Observable<any> {
    const url = `${environment.apiUrl}/users/verification-otp`;

    // Retrieve the token from storage or service
    const token = localStorage.getItem('token'); // or use a service to manage tokens

    const body = { userId: userId };

    return this.http.post<any>(url, body);
  }

  verifyEmail(otp: string, user: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/verify/${otp}?user=${user}`);
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`);
  }

  private baseUrlCop = `${environment.apiUrl}/companies`;
  createCompany(userData: any): Observable<any> {
    const url = `${this.baseUrlCop}`;
    return this.http.post<any>(url, userData);
  }

  getProfileDetails(profile: any | null) {
    let fullName = '';
    let initials = '';

    if (profile) {
      const firstName = profile.firstName?.trim() || '';
      const lastName = profile.lastName?.trim() || '';

      // Generate initials (first letter of first and last names, capitalized)
      const firstInitial = firstName.charAt(0).toUpperCase();
      const lastInitial = lastName.charAt(0).toUpperCase();
      initials = `${firstInitial}${lastInitial}`.trim();

      // Generate formatted fullName (e.g., "John DOE")
      fullName = [
        firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase(),
        lastName.toUpperCase(),
      ]
        .filter(Boolean) // Ensure no extra spaces when either name is missing
        .join(' ');
    }

    return { fullName, initials };
  }
}
