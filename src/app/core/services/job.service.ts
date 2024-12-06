import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private baseUrl = `${environment.apiUrl}/jobs`; // URL to get zip codes
  private subActivitiesbaseUrl = `${environment.apiUrl}/sub-activities`; // URL to get zip codes

  constructor(private http: HttpClient) {}

  // Get list of jobs (Métier)
  getJobs(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<any>(this.baseUrl, { headers });
  }

  // Get sous-activité and activité by job id
  getJobDetails(jobId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<any>(`${this.baseUrl}/${jobId}`, { headers });
  }

  getSubActivities(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<any>(this.subActivitiesbaseUrl, { headers });
  }

  getSubActivitiesDetails(subActivity: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<any>(`${this.subActivitiesbaseUrl}/${subActivity}`, {
      headers,
    });
  }
}
