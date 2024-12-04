import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  private contracttypebaseUrl = `${environment.apiUrl}/contract-types`;

  constructor(private http: HttpClient) {}

  getContractTypes(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<any>(this.contracttypebaseUrl, { headers });
  }

  getTypeDetails(contractTypeId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<any>(`${this.contracttypebaseUrl}/${contractTypeId}`, {
      headers,
    });
  }
}
