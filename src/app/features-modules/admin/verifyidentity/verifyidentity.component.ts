import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { Company } from 'src/app/core/models/models';
import { CompanyService } from 'src/app/core/services/company.service';
import { MatPaginator } from '@angular/material/paginator';
import { lastValueFrom } from 'rxjs';
import { routes } from 'src/app/core/helpers/routes/routes';
import { SpinnerService } from 'src/app/core/services/spinner/spinner.service';

@Component({
  selector: 'app-verifyidentity',
  templateUrl: './verifyidentity.component.html',
  styleUrls: ['./verifyidentity.component.scss'],
})
export class VerifyidentityComponent implements OnInit {
  dataSource!: MatTableDataSource<Company>;
  displayedColumns: string[] = [
    'ckeckbox',
    'createdAt',
    'name',
    'activity',
    'contact',
    'phone',
    'city',
    'action',
  ];
  spinner: boolean = false;

  public routes = routes;

  selectedCompaniesIds: string[] = [];
  constructor(
    private data: ShareDataService,
    private companyService: CompanyService // private spinner: SpinnerService
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

  async approveAll() {
    this.spinner = true;

    if (this.selectedCompaniesIds.length === 0) {
      console.warn('Aucune entreprise sélectionnée.');
      this.spinner = false;
      return;
    }

    try {
      this.companyService
        .approveSelectedCompanies(this.selectedCompaniesIds)
        .subscribe({
          next: (res) => {},
          error: (err) => {
            console.error(err);
          },
          complete: () => {
            this.getCompanies();
            this.spinner = false;
          },
        });
    } catch (error) {
      console.error('Erreur:', error);
      this.spinner = false;
    }
  }

  reject(companyId: string) {
    this.companyService.rejectCompany(companyId).subscribe(() => {
      this.getCompanies();
    });
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

  toggleCheckBoxes(event: Event) {
    const targetCheckbox = event.target as HTMLInputElement;
    const isChecked = targetCheckbox.checked;

    // Select all checkboxes in the table
    const allCheckboxes = document.querySelectorAll(
      'input[type="checkbox"]'
    ) as NodeListOf<HTMLInputElement>;

    allCheckboxes.forEach((checkbox) => {
      checkbox.checked = isChecked;
      const companyId = checkbox.value;

      // Make sure to ignore the "on" value (this happens if value is not set on the checkbox)
      if (companyId && companyId !== 'on') {
        if (isChecked) {
          // Add the company ID to the selectedCompaniesIds array if it's checked
          if (!this.selectedCompaniesIds.includes(companyId)) {
            this.selectedCompaniesIds.push(companyId);
          }
        } else {
          // Remove the company ID from the selectedCompaniesIds array if it's unchecked
          const index = this.selectedCompaniesIds.indexOf(companyId);
          if (index !== -1) {
            this.selectedCompaniesIds.splice(index, 1);
          }
        }
      }
    });
  }

  // This method will be triggered when a checkbox is clicked
  onCheckboxChange(element: any, event: any) {
    const isChecked = event.target.checked;
    if (isChecked) {
      // Add the company ID to the array if it's selected
      this.selectedCompaniesIds.push(element.id);
    } else {
      // Remove the company ID from the array if it's deselected
      this.selectedCompaniesIds = this.selectedCompaniesIds.filter(
        (id) => id !== element.id
      );
    }
  }

  // Optional: To check if a company is selected (for the checkbox state)
  isSelected(element: any): boolean {
    return this.selectedCompaniesIds.includes(element.id);
  }
}
export interface pageSelection {
  skip: number;
  limit: number;
}
