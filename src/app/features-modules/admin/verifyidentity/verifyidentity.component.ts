import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Company } from 'src/app/core/models/models';
import { CompanyService } from 'src/app/core/services/company.service';
import { MatPaginator } from '@angular/material/paginator';
import { routes } from 'src/app/core/helpers/routes/routes';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-verifyidentity',
  templateUrl: './verifyidentity.component.html',
  styleUrls: ['./verifyidentity.component.scss'],
})
export class VerifyidentityComponent implements OnInit {
  public routes = routes;
  spinner: boolean = false;
  public clients: any;
  // pagination variables
  public lastIndex = 0;
  public pageSize = 10;
  public totalData = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<any> = [];
  public currentPage = 1;
  public pageNumberArray: Array<any> = [];
  public pageSelection: Array<pageSelection> = [];
  public totalPages = 0;
  public searchDataValue = '';
  public companies: Company[] = [];
  selectedCompaniesIds: string[] = [];

  constructor(
    private companyService: CompanyService 
  ) {}

  ngOnInit(): void {
    this.getCompanies();
  }

  selectedCompany: any = null;

  setSelectedCompany(company: any): void {
    this.selectedCompany = company;
  }

  public searchData(value: string): void {
    const filterValue = value.trim().toLowerCase();

    this.clients = this.companies.filter((company: any) => {
      // Helper function to safely handle phone number
      const getCleanPhone = (phone: string | null): string => {
        if (!phone) return '';
        return phone.replace(/\s+/g, '').toLowerCase(); // Remove ALL whitespace
      };

      // Format creation date (DD/MM/YYYY)
      const createdAtDate = new Date(company.createdAt);
      const formattedDate = `${createdAtDate.getDate()}/${
        createdAtDate.getMonth() + 1
      }/${createdAtDate.getFullYear()}`;

      // Get first employee's contact info
      const firstEmployee = company.employees?.[0];
      const contactEmail = firstEmployee?.email?.toLowerCase() || '';
      const contactPhone = getCleanPhone(firstEmployee?.phone);

      return (
        company.name?.toLowerCase().includes(filterValue) || // Nom
        company.nafTitle?.toLowerCase().includes(filterValue) || // Activité
        contactEmail.includes(filterValue) || // Contact (email)
        contactPhone.includes(filterValue) || // Téléphone
        company.location?.city?.name?.toLowerCase().includes(filterValue) || // Ville
        formattedDate.includes(filterValue) // Date de création
      );
    });
  }

  getCompanies(): void {
    this.clients = [];
    this.serialNumberArray = [];

    this.companyService
      .getUnvirifiedCompanies(this.currentPage, this.pageSize)
      .subscribe({
        next: (res: any) => {
          this.companies = res.data;
          this.totalData = res.total;
          res.data.forEach((company: any, index: number) => {
            const serialNumber = index + 1;
            if (index >= this.skip && serialNumber <= this.limit) {
              this.clients.push(company);
              this.serialNumberArray.push(serialNumber);
            }
          });
          this.calculateTotalPages(this.totalData, this.pageSize);
        },
        error: (err) => {
          console.error(err);
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
            this.selectedCompaniesIds = [];
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
    try {
      const date = new Date(isoDate);
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        return ''; // or return a default value like 'Invalid Date'
      }
      return new Intl.DateTimeFormat('en-GB').format(date);
    } catch (e) {
      console.error('Error formatting date:', e);
      return ''; // or return a default value
    }
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

  public sortData(sort: Sort) {
    const data = this.clients.slice();

    if (!sort.active || sort.direction === '') {
      this.clients = data;
    } else {
      this.clients = data.sort((a: any, b: any) => {
        const aValue = this.getCompanyValue(a, sort.active);
        const bValue = this.getCompanyValue(b, sort.active);

        // Handle null values
        if (aValue == null && bValue == null) return 0;
        if (aValue == null) return 1;
        if (bValue == null) return -1;

        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  private getCompanyValue(company: any, key: string): any {
    switch (key) {
      case 'name': // Nom
        return company?.name?.toLowerCase();

      case 'activity': // Activité
        return company?.nafTitle?.toLowerCase();

      case 'contact': // Contact (first employee email)
        return company.employees?.[0]?.email?.toLowerCase();

      case 'phone': // Téléphone (first employee phone)
        return company.employees?.[0]?.phone?.replace(/\s+/g, '');

      case 'city': // Ville
        return company.location?.city?.name?.toLowerCase();

      case 'creationDate': // Date de création
        return new Date(company?.createdAt).getTime(); // Using timestamp for accurate date comparison


      default:
        return null;
    }
  }

  public changePageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getCompanies();
  }

  public getMoreData(event: string): void {
    if (event === 'next' && this.currentPage < this.totalPages) {
      this.currentPage++;
    } else if (event === 'previous' && this.currentPage > 1) {
      this.currentPage--;
    }
    this.getCompanies(); // Fetch the data for the new page
  }

  private calculateTotalPages(totalData: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalData / pageSize;
    if (this.totalPages % 1 != 0) {
      this.totalPages = Math.trunc(this.totalPages + 1);
    }
    for (let i = 1; i <= this.totalPages; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
  }

  public moveToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.getCompanies(); // Fetch the data for the selected page
  }
}
export interface pageSelection {
  skip: number;
  limit: number;
}
