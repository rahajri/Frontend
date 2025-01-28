import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InseeApiService {
  private tokenUrl = 'https://api.insee.fr/token';
  private siretUrl = 'https://api.insee.fr/entreprises/sirene/V3.11/siret';
  private clientId = 'F3AcaLupimYf2uVtpS2KHKD6npsa';
  private clientSecret = '4RNmZsAilD8He2rxNmzyweNJwZca';
  private readonly baseUrl = `${environment.apiUrl}/insee`; // Use the environment variable

  constructor(private http: HttpClient) {}

  // Fetch access token
  getAccessToken(): Observable<string> {
    const body = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: this.clientId,
      client_secret: this.clientSecret,
    }).toString();

    return this.http.post<any>(this.tokenUrl, body).pipe(
      map((response) => response.access_token),
      // Handle HTTP or network errors
      catchError((error) => {
        console.error('Error fetching access token:', error);
        return throwError(
          () =>
            new Error(
              'Failed to fetch access token. Please check your network or API credentials.'
            )
        );
      })
    );
  }

  // Fetch Siret details using access token
  getSiret(siret: string, accessToken: string): Observable<any> {
    const url = `${this.siretUrl}/${siret}`;
    return this.http.get<any>(url);
  }

  /**
   * Get details for a given SIRET
   * @param siret - The SIRET number to fetch details for
   * @returns Observable containing the SIRET details
   */
  getSiretDetails(siret: string): Observable<any> {
    const url = `${this.baseUrl}/${siret}`; // Construct the URL with the SIRET

    return this.http.get<any>(url).pipe(
      map((response) => response.data), // Extract the `data` field from the response
      catchError((error) => {
        console.error('Error fetching SIRET details:', error);
        return throwError(
          () => new Error('Aucun résultat trouvé pour ce numéro SIRET.')
        );
      })
    );
  }
}
