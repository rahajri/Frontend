import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpStatusCode,
} from '@angular/common/http';
import { catchError, Observable, throwError, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IaService {
  private apiUrl = 'https://www.interim-online.fr/ia';
  private authToken: string | null = null;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    if (this.authToken) {
      headers = headers.set('Authorization', `Bearer ${this.authToken}`);
    }
    return headers;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Network error:', error.error);
      return throwError(
        () =>
          new Error(
            'Network error - please check your connection and API availability'
          )
      );
    } else if (error.status === HttpStatusCode.Unauthorized) {
      console.error('Authentication error:', error.error);
      return throwError(
        () => new Error('Session expired - please login again')
      );
    } else {
      console.error(
        `Backend returned code ${error.status}, body was:`,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  private async ensureValidToken(): Promise<void> {
    if (!this.authToken) {
      await this.generateToken();
    }
  }

  async generateToken(): Promise<string> {
    try {
      const res = await firstValueFrom(
        this.http
          .post<{ access_token: string }>(
            `${this.apiUrl}/token`,
            {},
            { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
          )
          .pipe(catchError(this.handleError))
      );

      if (res?.access_token) {
        this.authToken = res.access_token;
        return res.access_token;
      }
      throw new Error('No token received');
    } catch (error) {
      console.error('Error generating token:', error);
      throw error;
    }
  }

  async generateCandidateEmb(candidateId: string): Promise<any> {
    await this.ensureValidToken();
    try {
      return await firstValueFrom(
        this.http
          .post<any>(
            `${this.apiUrl}/embeddings/candidate`,
            {
              id: candidateId,
              type: 'candidate',
            },
            { headers: this.getHeaders() }
          )
          .pipe(catchError(this.handleError))
      );
    } catch (error) {
      if (this.isAuthError(error)) {
        this.clearToken();
        return this.generateCandidateEmb(candidateId); // Retry once with new token
      }
      console.error('Error generating candidate embeddings:', error);
      throw error;
    }
  }

  async generateOfferEmb(offerId: string): Promise<any> {
    await this.ensureValidToken();
    try {
      return await firstValueFrom(
        this.http
          .post<any>(
            `${this.apiUrl}/embeddings/offer`,
            {
              id: offerId,
              type: 'offer',
            },
            { headers: this.getHeaders() }
          )
          .pipe(catchError(this.handleError))
      );
    } catch (error) {
      if (this.isAuthError(error)) {
        this.clearToken();
        return this.generateOfferEmb(offerId); // Retry once with new token
      }
      console.error('Error generating offer embeddings:', error);
      throw error;
    }
  }

  async iaCandidates(id: string): Promise<any[]> {
    await this.ensureValidToken();
    try {
      return await firstValueFrom(
        this.http
          .get<any>(`${this.apiUrl}/matching/candidates/${id}`, {
            headers: this.getHeaders(),
          })
          .pipe(catchError(this.handleError))
      );
    } catch (error) {
      if (this.isAuthError(error)) {
        this.clearToken();
        return this.iaCandidates(id); // Retry once with new token
      }
      console.error('Error matching candidates:', error);
      throw error;
    }
  }

  async iaOffers(id: string): Promise<any[]> {
    await this.ensureValidToken();
    try {
      return await firstValueFrom(
        this.http
          .get<any>(`${this.apiUrl}/matching/offers/${id}`, {
            headers: this.getHeaders(),
          })
          .pipe(catchError(this.handleError))
      );
    } catch (error) {
      if (this.isAuthError(error)) {
        this.clearToken();
        return this.iaOffers(id); // Retry once with new token
      }
      console.error('Error matching offers:', error);
      throw error;
    }
  }

  private isAuthError(error: any): boolean {
    return (
      error instanceof HttpErrorResponse &&
      error.status === HttpStatusCode.Unauthorized
    );
  }

  clearToken() {
    this.authToken = null;
  }
}
