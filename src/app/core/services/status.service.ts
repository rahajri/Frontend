import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  private baseUrl = `${environment.apiUrl}/status`;

  constructor(private http: HttpClient) {}

  getAllCompanyStatus(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/company');
  }
  getProjectsStatus(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/project');
  }
}
