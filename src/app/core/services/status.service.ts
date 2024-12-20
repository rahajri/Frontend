import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  private baseUrl = `${environment.apiUrl}/status`;

  constructor(private http: HttpClient) {}
  /**
   * Creates an authorization header
   */
  private createHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getAllCompanyStatus(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/company', {
      headers: this.createHeaders(),
    });
  }

}
