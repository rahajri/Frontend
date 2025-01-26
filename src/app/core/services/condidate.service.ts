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

  getallCandidates(): Observable<any> {
    return this.http.get(this.baseUrl);
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

  candidatesFiler(data: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/filter`, data);
  }

  deleteCandidate(candidateId: string) {
    return this.http.delete<any>(`${this.baseUrl}/${candidateId}`);
  }
  
  adminCreateUser(data: any) {
    const url = `${this.baseUrl}/create`;
    return this.http.post<any>(url, data);
  }
}
