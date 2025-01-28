import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private baseUrl = `${environment.apiUrl}/languages`; // URL to get zip codes

  constructor(private http: HttpClient) {}

  getLanguages(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }
}
