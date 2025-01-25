import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { Company } from 'src/app/core/models/models';
import { CompanyService } from 'src/app/core/services/company.service';
import { MatPaginator } from '@angular/material/paginator';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-verifyidentity',
  templateUrl: './verifyidentity.component.html',
  styleUrls: ['./verifyidentity.component.scss'],
})
export class VerifyidentityComponent implements OnInit {
  dataSource!: MatTableDataSource<Company>;
  displayedColumns: string[] = [
    'createdAt',
    'name',
    'activity',
    'contact',
    'phone',
    'city',
    'action',
  ];
  constructor(
    private data: ShareDataService,
    private companyService: CompanyService
  ) {
    this.dataSource = new MatTableDataSource<Company>([]);
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public searchDataValue = '';

  public companies: Company[] = [];

  ngOnInit(): void {
    this.getCompanies();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  selectedCompany: any = null;

  setSelectedCompany(company: any): void {
    this.selectedCompany = company;
  }

  searchData(target: any) {
    const filterValue = target.value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getCompanies(): void {
    this.companyService.getUnvirifiedCompanies().subscribe({
      next: (data: Company[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.companies = data;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.dataSource.paginator = this.paginator;
      },
    });
  }

  async approve(companyId: string) {
    this.companyService.approveCompany(companyId).subscribe(() => {
      this.getCompanies(); // Reload the list
    });
  }

  async approveAll(intervalMs: number = 1000) {
    if (!this.companies?.length) {
      console.warn('Aucune entreprise à valider.');
      return;
    }

    const results = [];

    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    try {
      for (const company of this.companies) {
        try {
          const result = await lastValueFrom(
            this.companyService.approveCompany(company.id)
          );
          results.push({ status: 'fulfilled', value: result });
          this.getCompanies(); // Refresh the list after all requests
        } catch (error) {
          results.push({ status: 'rejected', reason: error });
          console.error(`Erreur pour ${company.id}:`, error);
        }

        await delay(intervalMs);
      }
    } catch (globalError) {
      console.error('Erreur globale:', globalError);
    }
  }

  reject(companyId: string) {
    this.companyService.rejectCompany(companyId).subscribe(() => {
      this.getCompanies();
    });
  }

  async rejectAll(intervalMs: number = 1000) {
    if (!this.companies?.length) {
      console.warn('Aucune entreprise à refuser.');
      return;
    }
    const results = [];

    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    try {
      for (const company of this.companies) {
        try {
          const result = await lastValueFrom(
            this.companyService.rejectCompany(company.id)
          );
          results.push({ status: 'fulfilled', value: result });
          this.getCompanies(); // Refresh list after all requests
        } catch (error) {
          results.push({ status: 'rejected', reason: error });
          console.error(`Erreur pour ${company.id}:`, error);
        }
        // Add interval between requests
        await delay(intervalMs);
      }
    } catch (globalError) {
      console.error('Erreur globale:', globalError);
    }
  }

  getDate(isoDate: string): string {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat('en-GB').format(date); // Formats as DD/MM/YYYY
  }

  getContact(element: any): string {
    if (!element || !element.employees || element.employees.length === 0) {
      return ''; // Return an empty string if the element or employees array is null/undefined or empty
    }

    const employee = element.employees[0]; // Get the first employee

    // Format first name: First letter uppercase, rest lowercase
    const firstName =
      employee.firstName.charAt(0).toUpperCase() + // First letter uppercase
      employee.firstName.slice(1).toLowerCase(); // Rest lowercase

    // Format last name: All uppercase
    const lastName = employee.lastName.toUpperCase();

    // Return the formatted name
    return `${firstName} ${lastName}`;
  }
}
export interface pageSelection {
  skip: number;
  limit: number;
}
