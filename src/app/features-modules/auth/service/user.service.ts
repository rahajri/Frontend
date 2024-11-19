import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = `${environment.apiUrl}/auth`;
  constructor(private http: HttpClient,
    private router: Router) { }

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
  verifyOtp(userId : string): Observable<any> {
    const url = 'http://localhost:3000/users/verification-otp';
    
    // Retrieve the token from storage or service
    const token = localStorage.getItem('token'); // or use a service to manage tokens

    // Set up headers with the Bearer token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body = {"userId": userId };

    return this.http.post<any>(url, body, { headers });
  }

   // Assuming you have a service to handle the verification request
verifyEmail(otp: string, user: string) {
  return this.http.get(`http://localhost:3000/users/verify/${otp}?user=${user}`).pipe(
    catchError((error) => {
       // Handle error
      console.error('Verification failed', error);
      return of(error); // Return an observable with the error if needed
    }),
    map((response: any) => {
      console.log('response ', response.status);
      if (response.status === 'success') {
        // Redirect to login page after successful verification
       this.router.navigate(['/auth/login']);
      } else {
        // Handle failed verification
     //  alert('Verification failed');
      }
    })
  );
}


 private baseUrlCop = `${environment.apiUrl}/companies`;
  createCompany(userData: any): Observable<any> {
    const url = `${this.baseUrlCop}`;
    return this.http.post<any>(url, userData);
  }
}