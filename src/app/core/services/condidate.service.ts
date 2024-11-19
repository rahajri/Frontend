import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private baseUrl =  `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}



  
  createCandidate(candidateData: FormData): Observable<any> {
    const token = localStorage.getItem('token'); // Get the token from local storage
    const url = `${this.baseUrl}/candidates/profile`;
  
    // Set the headers with only Authorization, don't set Content-Type
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  
    // Use FormData as the body of the request, and no need to set Content-Type
    return this.http.post(url, candidateData, { headers });
  }
  
  checkCondidate(email : string): Observable<any> {
    const token = localStorage.getItem('token'); // Get the token from local storage
    const url = `${this.baseUrl}/candidates/exist`;
  
    // Set the headers with only Authorization, don't set Content-Type
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  
    // Use FormData as the body of the request, and no need to set Content-Type
    return this.http.post(url, email, { headers });
  } 


  getCandidate(email: string): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    const url = `${this.baseUrl}/candidates/candidate`;
  
    if (!token) {
      throw new Error('Authorization token is missing'); // Guard clause to prevent API call without a token
    }
  
    // Set the headers with Authorization
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  
    // Construct the request body (as required for POST)
    const body = { email }; // Wrapping the email in an object for better clarity
  
    return this.http.post<any>(url, body, { headers });
  }
  
  
  
}
