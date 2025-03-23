// email-storage.service.ts
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private baseUrl = `${environment.apiUrl}/message`;
  constructor(private http: HttpClient) {}

  sendMessageToAdmins(body: any): Observable<any> {
    const url = `${this.baseUrl}/send`;

    return this.http.post<any>(url, body);
  }
}
