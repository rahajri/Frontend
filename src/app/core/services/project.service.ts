import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
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
}
