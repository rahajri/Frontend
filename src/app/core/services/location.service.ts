import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private baseUrlcity = `${environment.apiUrl}/cities`; // URL to get zip codes
  private baseUrlzip = `${environment.apiUrl}/zip-codes`; // URL to get zip codes

  constructor(private http: HttpClient) {}

  // Method to get ZIP codes with Bearer token in headers
  getZipCodes(): Observable<any> {
    // Retrieve the token from local storage or a token service
    const token = localStorage.getItem('token'); // Replace with a service if needed

    // Set up headers with the Bearer token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<any>(this.baseUrlzip, { headers });
  }

  getZipCodeInfo(zipId: string): Observable<any> {
    const token = localStorage.getItem('token'); // Replace with a service if needed
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    // Concatenate the base URL and the zipId
    return this.http.get<any>(`${this.baseUrlzip}/${zipId}`, { headers });
  }

  getcityInfo(city: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer `,
      'Content-Type': 'application/json',
    });

    // Concatenate the base URL and the zipId
    return this.http.get<any>(`${this.baseUrlcity}/${city}`, { headers });
  }

  searchCities(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrlcity}/search?name=${query}`);
  }
}
