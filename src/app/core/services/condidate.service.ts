import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  createCandidate(candidateData: FormData): Observable<any> {
    const token = localStorage.getItem('token'); // Get the token from local storage
    const url = `${this.baseUrl}/candidates/profile`;

    return this.http.post(url, candidateData);
  }

  checkCondidate(email: string): Observable<any> {
    const token = localStorage.getItem('token'); // Get the token from local storage
    const url = `${this.baseUrl}/candidates/exist`;

    return this.http.post(url, email);
  }

  getCandidate(email: string): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    const url = `${this.baseUrl}/candidates/candidate`;

    if (!token) {
      throw new Error('Authorization token is missing'); // Guard clause to prevent API call without a token
    }

    const body = { email };

    return this.http.post<any>(url, body);
  }
}
