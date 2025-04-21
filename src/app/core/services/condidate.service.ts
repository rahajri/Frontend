import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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

  getallCandidates(
    page: number = 1,
    limit: number = 10
  ): Observable<{
    data: any[];
    total: number;
  }> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get<any>(this.baseUrl, { params });
  }

  getCandidate(email: string): Observable<any> {
    const url = `${this.baseUrl}/candidate`;

    const body = { email };

    return this.http.post<any>(url, body);
  }

  getCandidateById(id: string): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<any>(url);
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
  sendWelcomeMail(email: string) {
    const url = `${this.baseUrl}/welcome`;
    return this.http.post<any>(url, { email });
  }
}
