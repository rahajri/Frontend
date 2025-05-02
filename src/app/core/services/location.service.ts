import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { City } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private baseUrlcity = `${environment.apiUrl}/cities`;
  private baseUrlDepartment = `${environment.apiUrl}/department`;
  private baseUrlRegion = `${environment.apiUrl}/region`;
  private baseUrlzip = `${environment.apiUrl}/zip-codes`;

  constructor(private http: HttpClient) {}

  getZipCodes(): Observable<any> {
    return this.http.get<any>(this.baseUrlzip);
  }

  getZipCodeInfo(zipId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrlzip}/${zipId}`);
  }

  getcityInfo(city: string): Observable<any> {
    // Concatenate the base URL and the zipId
    return this.http.get<any>(`${this.baseUrlcity}/${city}`);
  }

  searchCities(query: string): Observable<City[]> {
    return this.http.get<any[]>(`${this.baseUrlcity}/search?name=${query}`);
  }

  searchDepartments(query: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrlDepartment}/search?name=${query}`
    );
  }

  searchRegions(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrlRegion}/search?name=${query}`);
  }
}
