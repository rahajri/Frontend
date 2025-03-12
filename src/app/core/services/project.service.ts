import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly baseUrl = `${environment.apiUrl}/project`;

  constructor(private http: HttpClient) {}

  /**
   * Creates a new project
   * @param project The project data
   */
  createProject(project: any) {
    return this.http.post<any>(`${this.baseUrl}/create`, project);
  }

  updateProject(id: string | null, projectData: any) {
    if (!id) {
      throw new Error('Project ID cannot be null');
    }
    return this.http.patch<any>(`${this.baseUrl}/${id}`, projectData);
  }

  /**
   * Fetches details of a specific project
   * @param id The project ID
   */
  getProjectDetails(id: string | null) {
    if (!id) {
      throw new Error('Project ID cannot be null');
    }

    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  /**
   * Publishes a project
   * @param id The project ID
   */
  publishProject(id: string | null) {
    if (!id) {
      throw new Error('Project ID cannot be null');
    }

    return this.http.post<any>(`${this.baseUrl}/${id}/publish`, {});
  }

  disableProject(id: string | null) {
    if (!id) {
      throw new Error('Project ID cannot be null');
    }

    return this.http.post<any>(`${this.baseUrl}/${id}/disable`, {});
  }

  getJobOffers(
    offset: number,
    limit: number,
    companyId: string
  ): Observable<any> {
    const params = new HttpParams()
      .set('page', offset.toString())
      .set('limit', limit.toString())
      .set('company', companyId);

    return this.http.get<any>(this.baseUrl, {
      params,
    });
  }

  getAllOffers() {
    return this.http.get<any>(`${this.baseUrl}/all`);
  }

  getPublishedOffers() {
    return this.http.get<any>(`${this.baseUrl}/published`);
  }

  projectsFiler(data: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/filter`, data);
  }

  projectsFilerCheckBoxes(arrays: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/filters`, arrays);
  }

  deleteOffer(offerId: string) {
    return this.http.delete<any>(`${this.baseUrl}/${offerId}`);
  }

  getActivities(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/activities`);
  }

  getSubActivities(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/sub-activities`);
  }

  getContractTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/contract-types`);
  }
}
