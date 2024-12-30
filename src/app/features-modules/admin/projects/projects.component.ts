import { Component, OnInit } from '@angular/core';

// import { Subject } from "rxjs";
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';
import { apiResultFormat, Company } from 'src/app/core/models/models';
import { CompanyService } from 'src/app/core/services/company.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { CommonService } from 'src/app/core/services/common/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InseeApiService } from 'src/app/core/services/insee-api.service';
import { LocationService } from 'src/app/core/services/location.service';
import { UserService } from '../../auth/service/user.service';
import { AlertService } from 'src/app/core/services/alert/alert.service';
import { Router } from '@angular/router';
declare var bootstrap: any;
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  public routes = routes;
  public lstProject!: Array<Company>;
  public url = 'admin';
  public searchDataValue = '';
  dataSource!: MatTableDataSource<Company>;
  filterForm!: FormGroup;
  addClientForm!: FormGroup;
  public lastIndex = 0;
  public pageSize = 10;
  public totalData = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  public totalPages = 0;
  filter: boolean = false;
  companiesData: any[] = [];
  selectedCompany: any = null;
  filteredCompanies: any[] = [];
  selectedStatus: string | null = null;
  countClient: number = 0;
  siretErrorMessage: string | null = null;

  companyToDelete: any;
  selectedHederTitle = 'Tous les';

  //** / pagination variables
  constructor(
    public router: Router,
    private companyService: CompanyService,
    private fb: FormBuilder,
    private inseeApiService: InseeApiService,
    private locationService: LocationService,
    private alertService: AlertService,
    private userService: UserService
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

  ngOnInit(): void {
    this.getTableData();
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
      this.filteredCompanies = this.companiesData;
    } else {
      // Filter companies based on the status name
      this.filteredCompanies = this.companiesData.filter(
        (company: any) => company.status?.name === status
      );
    }
    this.countClient = this.filteredCompanies.length;
  }

  setSelectedCompany(company: any): void {
    this.selectedCompany = company;
  }

  private getTableData(): void {
    this.companyService.getAllCompanies().subscribe(
      (response) => {
        console.log(response);
        this.companiesData = response;
        this.filteredCompanies = response;
        this.countClient = response.length;
      },
      (error) => {
        console.error('Error fetching companies:', error);
      }
    );
  }

  onChange() {
    const filterValues = this.filterForm.value;
    const isEmpty = Object.values(filterValues).some((value) => value === '');
    if (isEmpty) {
      this.getTableData();
    }
  }

  getDate(isoDate: string): string {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat('en-GB').format(date); // Formats as DD/MM/YYYY
  }

  onFilterSubmit() {
    if (this.filterForm.valid) {
      console.log(this.filterForm.value);
      this.filterComp(this.filterForm.value);
    }
  }

  public sortData(sort: Sort) {
    const data = this.lstProject.slice();

    if (!sort.active || sort.direction === '') {
      this.lstProject = data;
    } else {
      this.lstProject = data.sort((a, b) => {
        const aValue = (a as never)[sort.active];

        const bValue = (b as never)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public searchData(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.lstProject = this.dataSource.filteredData;
  }

  public getMoreData(event: string): void {
    if (event == 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
    } else if (event == 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
    }
  }

  public moveToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.skip = this.pageSelection[pageNumber - 1].skip;
    this.limit = this.pageSelection[pageNumber - 1].limit;
    if (pageNumber > this.currentPage) {
      this.pageIndex = pageNumber - 1;
    } else if (pageNumber < this.currentPage) {
      this.pageIndex = pageNumber + 1;
    }
    this.getTableData();
  }

  public changePageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableData();
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
    console.log(company);
    this.companyService.deleteCompany(company?.id).subscribe({
      next: (res) => {
        this.hideModal('delete_client');
        this.getTableData();
        console.log(res);
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
        console.log(response);
        this.filteredCompanies = response;
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
    console.log(this.addClientForm.value);

    if (this.addClientForm.valid) {
      let data = this.addClientForm.value;
      this.userService.createCompany(data).subscribe(
        (response) => {
          this.alertService.showAlert(
            'company created successfully!',
            'success'
          );
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
}
export interface pageSelection {
  skip: number;
  limit: number;
}
