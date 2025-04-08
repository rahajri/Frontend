import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IaService {
  private apiUrl = 'http://46.202.129.82:9090';
  private authToken: string | null =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiYWNrZW5kX3VzZXIiLCJleHAiOjE3NDQxMDU3OTR9.mxM1nssTMqkA1ZtOqYPCyNQuMFiC5dw16bYjPiEg7ns';

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

  async genereteToken() {
    try {
      const res = await this.http
        .post<any>(
          `${this.apiUrl}/token`,
          {}, // Add credentials here if needed
          { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
        )
        .pipe(catchError(this.handleError))
        .toPromise();

      if (res?.access_token) {
        console.log(res.access_token);
      }
      return res;
    } catch (error) {
      console.error('Error generating token:', error);
      throw error;
    }
  }

  async genereteCandidateEmb() {
    //candidateId: string
    try {
      const res = await this.http
        .post<any>(
          `${this.apiUrl}/embeddings/candidate`,
          {
            id: '66259b81-02b0-4168-b1fe-fbfbc0f39d7a',
            type: 'candidate',
          },
          { headers: this.getHeaders() }
        )
        .toPromise();

      return res;
    } catch (error) {
      console.error('Error generating candidate embeddings:', error);
      throw error;
    }
  }

  async genereteOfferEmb(offerId: string) {
    //offerId: string
    console.log('OfferId : ', offerId);
    try {
      const res = await this.http
        .post<any>(
          `${this.apiUrl}/embeddings/offer`,
          {
            id: offerId, //change it to Dynamic
            type: 'offer',
          },
          { headers: this.getHeaders() }
        )
        .toPromise();
      console.log('res : ', res);
      return res;
    } catch (error) {
      console.error('Error generating offer embeddings:', error);
      throw error;
    }
  }

  async iaCandidates(id: string) {
    try {
      const res = await this.http
        .post<any>(
          `${this.apiUrl}/matching/candidates/${id}`,
          {},
          { headers: this.getHeaders() }
        )
        .toPromise();
      return res;
    } catch (error) {
      console.error('Error matching candidates:', error);
      throw error;
    }
  }

  async iaOffers(id: string) {
    try {
      const res = await this.http
        .post<any>(
          `${this.apiUrl}/matching/offers/${id}`,
          {},
          { headers: this.getHeaders() }
        )
        .toPromise();
      return res;
    } catch (error) {
      console.error('Error matching offers:', error);
      throw error;
    }
  }

  // Optional: Add a method to clear the token
  clearToken() {
    this.authToken = null;
  }
}
