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

  changeCandidatureStatus(id: string | null, status: string) {
    if (!id) {
      throw new Error('Project ID cannot be null');
    }
    return this.http.patch<any>(`${this.baseUrl}/candidature/${id}`, {
      status,
    });
  }

  getProjectDetails(id: string | null, candidateId?: string | null) {
    if (!id) {
      throw new Error('Project ID cannot be null');
    }

    let params = new HttpParams();
    if (candidateId) {
      params = params.set('candidateId', candidateId);
    }

    return this.http.get<any>(`${this.baseUrl}/${id}`, { params });
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

  employerDashboardCharts(id: string) {
    return this.http.get<any>(`${this.baseUrl}/employer/counts/${id}`);
  }

  candidateDashboardCharts(id: string) {
    return this.http.get<any>(`${this.baseUrl}/candidate/counts/${id}`);
  }

  adminDashboardCharts() {
    return this.http.get<any>(`${this.baseUrl}/admin/counts`);
  }

  getJobOffers(
    offset: number,
    limit: number,
    companyId: string,
    status: string | null = null
  ): Observable<any> {
    let params = new HttpParams()
      .set('page', offset.toString())
      .set('limit', limit.toString())
      .set('company', companyId);

    if (status !== null) {
      params = params.set('status', status);
    }

    return this.http.get<any>(this.baseUrl, {
      params,
    });
  }

  getAllOffers() {
    return this.http.get<any>(`${this.baseUrl}/all`);
  }

  getPublishedOffers(
    page: number,
    limit: number
  ): Observable<{ offers: any[]; total: number }> {
    return this.http.get<any>(
      `${this.baseUrl}/published?page=${page}&limit=${limit}`
    );
  }

  getCandidatures(
    page: number = 1,
    limit: number = 10,
    status: string | null = null
  ): Observable<{
    data: any[];
    total: number;
    appliedCount: number;
    recruitmentApprovedCount: number;
    all: number;
  }> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    status = status === 'null' || status === '' ? null : status;

    if (status) {
      params = params.set('status', status);
    }

    return this.http.get<any>(`${this.baseUrl}/candidatures`, { params });
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

  deleteCandidature(candidatureId: string) {
    return this.http.delete<any>(
      `${this.baseUrl}/candidature/${candidatureId}`
    );
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

  getAvailableOffersByCompany(
    companyId: string,
    page: number,
    limit: number
  ): Observable<{ offers: any[]; total: number }> {
    return this.http.get<{ offers: any[]; total: number }>(
      `${this.baseUrl}/available/${companyId}?page=${page}&limit=${limit}`
    );
  }

  getClosedOffersByCompany(
    companyId: string,
    page: number,
    limit: number
  ): Observable<{ offers: any[]; total: number }> {
    return this.http.get<{ offers: any[]; total: number }>(
      `${this.baseUrl}/closed/${companyId}?page=${page}&limit=${limit}`
    );
  }

  assignCandidate(offerId: string, candidateId: string, data: any) {
    return this.http.post<any>(
      `${this.baseUrl}/assign/${offerId}/candidate/${candidateId}`,
      data
    );
  }

  sendAdminMessage(formData: any) {
    return this.http.post<any>(
      `${this.baseUrl}/assign/approuve-candidate`,
      formData
    );
  }

  getCandidateCandidatures(
    offset: number,
    limit: number,
    candidateId: string,
    status: string | null = null
  ): Observable<any> {
    let params = new HttpParams()
      .set('page', offset.toString())
      .set('limit', limit.toString());

    if (status) {
      params = params.set('status', status);
    }

    return this.http.get<any>(`${this.baseUrl}/candidatures/${candidateId}`, {
      params,
    });
  }
}
