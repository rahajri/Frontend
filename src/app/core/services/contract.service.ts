import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  private contracttypebaseUrl = `${environment.apiUrl}/contract-types`;

  constructor(private http: HttpClient) {}

  getContractTypes(): Observable<any> {
    return this.http.get<any>(this.contracttypebaseUrl);
  }

  getTypeDetails(contractTypeId: string): Observable<any> {
    return this.http.get<any>(`${this.contracttypebaseUrl}/${contractTypeId}`);
  }
}
