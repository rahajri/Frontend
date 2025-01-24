import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { Company } from 'src/app/core/models/models';
import { CompanyService } from 'src/app/core/services/company.service';
import { MatPaginator } from '@angular/material/paginator';

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

  approve(companyId: string) {
    this.companyService.approveCompany(companyId).subscribe(() => {
      // Handle successful approval
      this.getCompanies(); // Reload the list
    });
  }
  approveAll() {
    // Vérifiez s'il y a des entreprises à valider
    if (!this.companies || this.companies.length === 0) {
      console.warn('Aucune entreprise à valider.');
      return;
    }

    // Itérer sur chaque entreprise et appeler la fonction approve
    this.companies.forEach((company: any) => {
      this.companyService.approveCompany(company.id).subscribe({
        next: () => {
          console.log(`Entreprise ${company.id} approuvée avec succès.`);
        },
        error: (err) => {
          console.error(
            `Erreur lors de l'approbation de l'entreprise ${company.id}:`,
            err
          );
        },
      });
    });

    // Recharger la liste après avoir tout approuvé
    this.getCompanies();
  }

  reject(companyId: string) {
    this.companyService.rejectCompany(companyId).subscribe(() => {
      // Handle successful rejection
      this.getCompanies(); // Reload the list
    });
  }

  rejectAll() {
    // Vérifiez s'il y a des entreprises à refuser
    if (!this.companies || this.companies.length === 0) {
      console.warn('Aucune entreprise à refuser.');
      return;
    }

    // Itérer sur chaque entreprise et appeler la fonction reject
    this.companies.forEach((company: any) => {
      this.companyService.rejectCompany(company.id).subscribe({
        next: () => {},
        error: (err) => {
          console.error(
            `Erreur lors du refus de l'entreprise ${company.id}:`,
            err
          );
        },
      });
    });

    // Recharger la liste après avoir tout refusé
    this.getCompanies();
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
