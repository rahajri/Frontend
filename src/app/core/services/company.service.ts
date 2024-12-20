import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
// Define the Company interface within the service file
export interface Company {
  siret: string;
  denominationUniteLegale: string; // Company name
  activitePrincipaleUniteLegale: string;
  trancheEffectifsUniteLegale: number;
  categorieEntreprise: string;
  complementAdresseEtablissement: string;
  numeroVoieEtablissement: string;
  typeVoieEtablissement: string;
  libelleVoieEtablissement: string;
  codePostalEtablissement: number;
  libelleCommuneEtablissement: string;
}
interface NAF {
  NAF732: string;
  A129: string;
  A88: string;
  A38: string;
  A17: string;
  A4: string;
  INTITULÉS: string;
}
interface ApiResultFormat {
  data: Company[];
}

interface NafApiResultFormat {
  data: NAF[];
}

export interface apiResultFormat {
  data: Company[]; // Array of Company objects
  totalData: number;
}
@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private baseUrl = `${environment.apiUrl}/companies`; // URL to get zip codes

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  // Method to load all companies data
  public loadCompaniesData(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/companies.json');
  }

  // First function to get the company by SIRET
  public getCompanyBySiret(siret: string): Observable<Company | undefined> {
    return this.http.get<ApiResultFormat>('assets/json/companies.json').pipe(
      map((data: ApiResultFormat) => {
        const company = data.data.find((company) => company.siret == siret);
        if (company) {
          // Remove '.' from activitePrincipaleUniteLegale
          company.activitePrincipaleUniteLegale =
            company.activitePrincipaleUniteLegale.replace('.', '');
        }
        return company;
      })
    );
  }
  // First function to get the company by id
  getCompanyDetails(id: string | null) {
    if (!id) {
      throw new Error('Company ID cannot be null');
    }
    return this.http.get<any>(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Second function to get the NAF details based on the company's activitePrincipaleUniteLegale
  public getNafByCompany(steSiret: any): Observable<NAF | undefined> {
    return this.http.get<NafApiResultFormat>('assets/json/nafs.json').pipe(
      map((nafData: NafApiResultFormat) => {
        return nafData.data.find((naf) => naf.NAF732 == steSiret);
      })
    );
  }

  getAllCompanies(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`, {
      headers: this.getAuthHeaders(),
    });
  }

  getUnvirifiedCompanies(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/inactive`, {
      headers: this.getAuthHeaders(),
    });
  }

  approveCompany(companyId: string): Observable<any> {
    return this.http.patch<any>(
      `${this.baseUrl}/${companyId}/approve`,
      {},
      { headers: this.getAuthHeaders() }
    );
  }

  rejectCompany(companyId: string): Observable<any> {
    return this.http.patch<any>(
      `${this.baseUrl}/${companyId}/reject`,
      {},
      { headers: this.getAuthHeaders() }
    );
  }

  checkSiretExists(siret: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/siret/${siret}`, {
      headers: this.getAuthHeaders(),
    });
  }

  updateCompany(companyId: string, data: any) {
    return this.http.patch<any>(`${this.baseUrl}/${companyId}/update`, data, {
      headers: this.getAuthHeaders(),
    });
  }

  updateCompanyStatus(companyId: string, statusId: string): Observable<any> {
    return this.http.patch(
      `${this.baseUrl}/${companyId}/status`,
      {
        statusId,
      },
      {
        headers: this.getAuthHeaders(),
      }
    );
  }
}
