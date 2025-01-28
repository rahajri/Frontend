import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private baseUrl = `${environment.apiUrl}/jobs`; // URL to get zip codes
  private subActivitiesbaseUrl = `${environment.apiUrl}/sub-activities`; // URL to get zip codes

  constructor(private http: HttpClient) {}

  // Get list of jobs (Métier)
  getJobs(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  // Get sous-activité and activité by job id
  getJobDetails(jobId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${jobId}`);
  }

  getSubActivities(): Observable<any> {
    return this.http.get<any>(this.subActivitiesbaseUrl);
  }

  getSubActivitiesDetails(subActivity: string): Observable<any> {
    return this.http.get<any>(`${this.subActivitiesbaseUrl}/${subActivity}`);
  }
}
