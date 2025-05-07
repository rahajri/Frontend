import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { City, Company, Department, Region } from 'src/app/core/models/models';
import { CompanyService } from 'src/app/core/services/company.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InseeApiService } from 'src/app/core/services/insee-api.service';
import { LocationService } from 'src/app/core/services/location.service';
import { UserService } from '../../auth/service/user.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { CommonService } from 'src/app/core/services/common/common.service';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  of,
  Observable,
  startWith,
  catchError,
} from 'rxjs';
import { exportToCsv } from 'src/app/core/services/common/common-functions';
declare var bootstrap: any;
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  public lstBoard: Company[] = [];
  public routes = routes;
  public searchDataValue = '';
  filterForm!: FormGroup;
  addClientForm!: FormGroup;
  filter: boolean = false;
  companiesData: any[] = [];
  selectedCompany: any = null;
  selectedStatus: string | null = null;
  countClient: number = 0;
  siretErrorMessage: string | null = null;
  companyToDelete: any;
  selectedHederTitle = 'Tous les';

  filteredCityOptions: Observable<City[]> = of([]);
  filteredDepartmentOptions: Observable<Department[]> = of([]);
  filteredRegionOptions: Observable<Region[]> = of([]);

  selectedCompaniesIds: string[] = [];
  exportSelection: boolean = false;

  //** / pagination variables
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
  constructor(
    public router: Router,
    private companyService: CompanyService,
    private fb: FormBuilder,
    private inseeApiService: InseeApiService,
    private locationService: LocationService,
    private userService: UserService,
    private commonService: CommonService
  ) {
    this.filterForm = this.fb.group({
      companyName: [''],
      contactFName: [''],
      contactLName: [''],
      city: [''],
      department: [''],
      region: [''],
    });

    this.addClientForm = this.fb.group({
      user: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phone: [
          '',
          [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [null],
      }),
      company: this.fb.group({
        siret: [''],
        name: [''],
        nafTitle: [''],
        naf: [''],
        category: [''],
        workforce: [''],
        location: this.fb.group({
          postalCode: [''],
          city: [''],
          department: [''],
          region: [''],
          address: [''],
          addressLine2: [''],
        }),
      }),
    });
  }
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getTableData();
    this.initializeAutocomplete('city', (query) =>
      this.locationService.searchCities(query)
    );
    this.initializeAutocomplete('department', (query) =>
      this.locationService.searchDepartments(query)
    );
    this.initializeAutocomplete('region', (query) =>
      this.locationService.searchRegions(query)
    );
  }

  initializeAutocomplete(
    controlName: 'city' | 'department' | 'region',
    searchFn: (query: string) => Observable<any[]>
  ): void {
    const control = this.filterForm.get(controlName);
    const propertyName = `filtered${this.capitalizeFirstLetter(
      controlName
    )}Options` as
      | 'filteredCityOptions'
      | 'filteredDepartmentOptions'
      | 'filteredRegionOptions';

    if (!control) {
      this[propertyName] = of([]);
      return;
    }

    this[propertyName] = control.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query) => {
        const name = typeof query === 'string' ? query : query?.name;
        if (name && name.length >= 2) {
          return searchFn(name).pipe(catchError(() => of([])));
        } else {
          return of([]);
        }
      })
    );
  }

  private capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  displayFn(item: any): string {
    return item || '';
  }

  //Filter toggle
  openFilter() {
    this.filter = !this.filter;
  }

  filterCompaniesByStatus(status: string | null): void {
    this.selectedHederTitle = this.getTranslation(status);
    this.selectedStatus = status;
    if (!status) {
      // If no status is provided, return all companies
      this.lstBoard = this.companiesData;
    } else {
      // Filter companies based on the status name
      this.lstBoard = this.companiesData.filter(
        (company: any) => company.status?.name === status
      );
    }
    this.countClient = this.lstBoard.length;
  }

  setSelectedCompany(company: any): void {
    this.selectedCompany = company;
  }

  private getTableData(): void {
    this.lstBoard = [];
    this.companyService
      .getAllCompanies(this.currentPage, this.pageSize)
      .subscribe({
        next: (response) => {
          this.companiesData = response.data;
          this.countClient = response.total;
          this.totalData = response.total;
          response.data.forEach((company: any, index: number) => {
            const serialNumber = index + 1;
            if (index >= this.skip && serialNumber <= this.limit) {
              this.lstBoard.push(company);
              this.serialNumberArray.push(serialNumber);
            }
            this.calculateTotalPages(this.totalData, this.pageSize);
          });
        },
        error: (error) => {
          console.error('Error fetching companies:', error);
        },
      });
  }

  onChange() {
    const filterValues = this.filterForm.value;
    const isEmpty = Object.values(filterValues).some((value) => value === '');
    if (isEmpty) {
      this.getTableData();
    }
  }

  getDate(isoDate: string) {
    return this.commonService.formatDate(isoDate);
  }

  onFilterSubmit() {
    if (this.filterForm.valid) {
      this.filterComp({
        ...this.filterForm.value,
        status: this.selectedStatus,
      });
    }
  }

  searchData(value: string) {
    const filterValue = value.trim().toLowerCase();

    this.lstBoard = this.companiesData.filter((company: Company) => {
      // Helper function to safely handle phone number
      const getCleanPhone = (phone: string | null): string => {
        if (!phone) return '';
        return phone.replace(/\s+/g, '').toLowerCase(); // Remove ALL whitespace
      };
      return (
        company.name?.toLowerCase().includes(filterValue) ||
        company.employees?.[0].lastName?.toLowerCase().includes(filterValue) ||
        company.employees?.[0].firstName?.toLowerCase().includes(filterValue) ||
        getCleanPhone(company.employees?.[0]?.phone || '').includes(
          filterValue
        ) ||
        company.nafTitle?.toLowerCase().includes(filterValue)
      );
    });
  }

  getTranslation(key: string | null): string {
    if (key === null) {
      return 'Tous les';
    } else {
      const translations: { [key: string]: string } = {
        Active: 'Actifs',
        Inactive: 'Inactifs',
      };
      return translations[key] || key;
    }
  }

  deleteCompany(company: any) {
    this.companyService.deleteCompany(company?.id).subscribe({
      next: (res) => {
        this.hideModal('delete_client');
        this.getTableData();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  showDeleteCategoryModal(company: any) {
    this.companyToDelete = company;
    const modalElement = document.getElementById('delete_client');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
      modalElement.focus();
    }
  }

  hideModal(id: string) {
    const modalElement = document.getElementById(id);
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }

  filterComp(data: any) {
    this.companyService.companiesFiler(data).subscribe({
      next: (response) => {
        this.lstBoard = response;
        this.countClient = response.length;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getDepartmentRegion(city: string): void {
    this.locationService.getcityInfo(city).subscribe(
      (data) => {
        if (data && data.department && data.department.region) {
          this.addClientForm.patchValue({
            company: {
              location: {
                department: data.department.name,
                region: data.department.region.name,
              },
            },
          });
        } else {
          console.warn('Incomplete location data returned for city:', city);
        }
      },
      (error) => {
        console.error('Error fetching ZIP code info:', error);
      }
    );
  }

  getSiretDetails(event: Event): void {
    const siret = (event.target as HTMLInputElement).value;

    if (!siret) {
      console.error('SIRET is empty');
      this.siretErrorMessage = 'Le SIRET ne peut pas être vide.';
      return;
    }

    // Check if SIRET exists before proceeding
    this.companyService.checkSiretExists(siret).subscribe({
      next: (data) => {
        if (data.exists) {
          this.siretErrorMessage = data.message;
          return;
        }

        this.inseeApiService.getSiretDetails(siret).subscribe({
          next: (data) => {
            this.siretErrorMessage = null; // Clear previous error

            const etablissement = data?.etablissement || {};
            const uniteLegale = etablissement.uniteLegale || {};
            const adresse = etablissement.adresseEtablissement || {};

            this.getDepartmentRegion(adresse.libelleCommuneEtablissement);

            const naf =
              etablissement?.periodesEtablissement?.[0]?.activitePrincipaleEtablissement?.replace(
                '.',
                ''
              );

            this.addClientForm.patchValue({
              company: {
                name: uniteLegale?.denominationUniteLegale || '',
                category: uniteLegale?.categorieEntreprise || '',
                workforce: uniteLegale?.trancheEffectifsUniteLegale || 0,
                naf: naf || '',
                location: {
                  address: `${adresse?.numeroVoieEtablissement || ''} ${
                    adresse?.typeVoieEtablissement || ''
                  } ${adresse?.libelleVoieEtablissement || ''}`.trim(),
                  addressLine2: adresse?.complementAdresseEtablissement || '',
                  postalCode: adresse?.codePostalEtablissement || '',
                  city: adresse?.libelleCommuneEtablissement || '',
                },
              },
            });

            if (naf) {
              this.companyService.getNafByCompany(naf).subscribe({
                next: (nafValue) => {
                  if (nafValue) {
                    this.addClientForm.patchValue({
                      company: {
                        nafTitle: nafValue.INTITULÉS,
                      },
                    });
                  }
                },
                error: (error) => {
                  console.error('Error fetching NAF details:', error);
                },
              });
            }
          },
          error: (error) => {
            this.siretErrorMessage = error?.message;
          },
        });
      },
      error: (error) => {
        this.siretErrorMessage = 'Error checking SIRET existence.';
      },
    });
  }

  onClienSubmit() {
    if (this.addClientForm.valid) {
      let data = this.addClientForm.value;
      this.userService.createCompany(data).subscribe(
        (response) => {
          this.verifyOtp(response?.user.id);
          this.hideModal('add-company');
          this.getTableData();
        },
        (error) => {
          console.error('Error creating client:', error);
        }
      );
    }
  }

  verifyOtp(userId: string) {
    this.userService.verifyOtp(userId).subscribe({
      next: (response) => {},
      error: (error) => {
        console.error('Verification failed', error);
      },
    });
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

  public getMoreData(event: string): void {
    if (event === 'next' && this.currentPage < this.totalPages) {
      this.currentPage++;
    } else if (event === 'previous' && this.currentPage > 1) {
      this.currentPage--;
    }
    this.getTableData(); // Fetch the data for the new page
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
    this.getTableData(); // Fetch the data for the selected page
  }

  public sortData(sort: Sort) {
    const data = this.lstBoard.slice();

    if (!sort.active || sort.direction === '') {
      this.lstBoard = data;
    } else {
      this.lstBoard = data.sort((a, b) => {
        const aValue = this.getValue(a, sort.active);
        const bValue = this.getValue(b, sort.active);

        // Handle null values
        if (aValue == null && bValue == null) return 0;
        if (aValue == null) return 1;
        if (bValue == null) return -1;

        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
  private getValue(item: any, key: string): any {
    switch (key) {
      case 'createdAt':
        return item?.createdAt;
      case 'name':
        return item?.name;
      case 'nafTitle':
        return item?.nafTitle;
      case 'phone':
        return item.employees?.[0]?.phone;
      case 'contact':
        return `${item.employees?.[0].firstName} ${item.employees?.[0].lastName}`;
      case 'status':
        return item.status?.name;
      default:
        return null; // Handle any unknown keys
    }
  }

  public changePageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableData();
  }

  toggleCheckBoxes(event: Event) {
    if (this.exportSelection) {
      this.exportSelection = false;
    }
    const targetCheckbox = event.target as HTMLInputElement;
    const isChecked = targetCheckbox.checked;
    // Select all checkboxes in the table
    const allCheckboxes = document.querySelectorAll(
      'input[type="checkbox"]'
    ) as NodeListOf<HTMLInputElement>;
    allCheckboxes.forEach((checkbox) => {
      checkbox.checked = isChecked;
      const candidateId = checkbox.value;
      // Make sure to ignore the "on" value (this happens if value is not set on the checkbox)
      if (candidateId && candidateId !== 'on') {
        if (isChecked) {
          // Add the company ID to the selectedCompaniesIds array if it's checked
          if (!this.selectedCompaniesIds.includes(candidateId)) {
            this.selectedCompaniesIds.push(candidateId);
          }
        } else {
          // Remove the company ID from the selectedCompaniesIds array if it's unchecked
          const index = this.selectedCompaniesIds.indexOf(candidateId);
          if (index !== -1) {
            this.selectedCompaniesIds.splice(index, 1);
          }
        }
      }
    });
  }
  isSelected(element: any): boolean {
    return this.selectedCompaniesIds.includes(element.id);
  }

  // This method will be triggered when a checkbox is clicked
  onCheckboxChange(element: any, event: any) {
    if (this.exportSelection) {
      this.exportSelection = false;
    }
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
  exportCompaniesToCsv() {
    if (
      this.companiesData.length === 0 ||
      this.selectedCompaniesIds.length === 0
    ) {
      this.exportSelection = !this.exportSelection;
      console.warn('No company data to export');
      return;
    }

    // Filter companies if specific IDs are selected
    const companiesToExport =
      this.selectedCompaniesIds && this.selectedCompaniesIds.length
        ? this.companiesData.filter((company) =>
            this.selectedCompaniesIds.includes(company.id)
          )
        : this.companiesData;

    // Format filename with current date
    const now = new Date();
    const dateString = `${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
    const filename = `Clients_${dateString}.csv`;

    // Flatten the data
    const flattenedRows = companiesToExport.map((company) => {
      return {
        ID: company.id,
        Nom: company.name || '',
        SIRET: company.siret || '',
        Email: company.email || '',
        Téléphone: company.phone || '',
        'Code NAF': company.naf || '',
        'Libellé NAF': company.nafTitle || '',
        Catégorie: company.category || '',
        Effectif: company.workforce || '',
        'Date de création': company.createdAt || '',
        'Dernière mise à jour': company.updatedAt || '',
        Statut: company.status?.name || '',
        'Description statut': company.status?.description || '',
        'Contact principal': `${company.employees?.[0]?.firstName || ''} ${
          company.employees?.[0]?.lastName || ''
        }`.trim(),
        'Email contact': company.employees?.[0]?.email || '',
        'Téléphone contact': company.employees?.[0]?.phone || '',
        Adresse: company.location?.address || '',
        "Complément d'adresse": company.location?.addressLine2 || '',
        Ville: company.location?.city?.name || '',
        Département: company.location?.city?.department?.name || '',
        Région: company.location?.city?.department?.region?.name || '',
      };
    });

    // Call the export function
    exportToCsv(filename, flattenedRows);
  }
}

export interface pageSelection {
  skip: number;
  limit: number;
}
