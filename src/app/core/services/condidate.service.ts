import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  private baseUrl = `${environment.apiUrl}/candidates`;

  constructor(private http: HttpClient) {}

  createCandidate(candidateData: FormData): Observable<any> {
    const url = `${this.baseUrl}/profile`;

    return this.http.post(url, candidateData);
  }

  checkCondidate(email: string): Observable<any> {
    const url = `${this.baseUrl}/exist`;

    return this.http.post(url, email);
  }

  getCandidate(email: string): Observable<any> {
    const url = `${this.baseUrl}/candidate`;

    const body = { email };

    return this.http.post<any>(url, body);
  }

  updateCandidateProfile(candidateId: string, body: any): Observable<any> {
    const url = `${this.baseUrl}/${candidateId}/profile`;

    return this.http.post<any>(url, body);
  }
}
