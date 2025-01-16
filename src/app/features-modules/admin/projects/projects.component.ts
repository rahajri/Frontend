import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Company } from 'src/app/core/models/models';
import { CompanyService } from 'src/app/core/services/company.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InseeApiService } from 'src/app/core/services/insee-api.service';
import { LocationService } from 'src/app/core/services/location.service';
import { UserService } from '../../auth/service/user.service';
import { AlertService } from 'src/app/core/services/alert/alert.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { CommonService } from 'src/app/core/services/common/common.service';
declare var bootstrap: any;
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  dataSource: MatTableDataSource<Company>;
  displayedColumns: string[] = [
    'createdAt',
    'name',
    'nafTitle',
    'Contact',
    'Téléphone',
    'Status',
    'action',
  ];
  public routes = routes;
  public lstProject!: Array<Company>;
  public url = 'admin';
  public searchDataValue = '';
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
    private userService: UserService,
    private commonService: CommonService
  ) {
    this.dataSource = new MatTableDataSource<Company>([]);
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
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  sortClicked() {
    this.dataSource.sort = this.sort;
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
      this.dataSource.data = this.filteredCompanies;
    } else {
      // Filter companies based on the status name
      this.filteredCompanies = this.companiesData.filter(
        (company: any) => company.status?.name === status
      );
      this.dataSource.data = this.filteredCompanies;
    }
    this.countClient = this.filteredCompanies.length;
  }

  setSelectedCompany(company: any): void {
    this.selectedCompany = company;
  }

  private getTableData(): void {
    this.companyService.getAllCompanies().subscribe({
      next: (response) => {
        console.log(response);
        this.companiesData = response;
        this.filteredCompanies = response;
        this.dataSource = new MatTableDataSource(response);
        this.countClient = response.length;
      },
      error: (error) => {
        console.error('Error fetching companies:', error);
      },
      complete: () => {
        this.dataSource.sort = this.sort; // Assign sort after view initialization
        this.dataSource.paginator = this.paginator;
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

  searchData(target: any) {
    const filterValue = target.value.trim().toLowerCase();

    // Apply the filter to the dataSource
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const contact =
        (data.employees?.[0]?.firstName || '') +
        ' ' +
        (data.employees?.[0]?.lastName || '');
      const phone = data.employees?.[0]?.phone || '';

      // Check if the filter value matches any relevant property (contact or phone)
      return (
        contact.toLowerCase().includes(filter) ||
        phone.toLowerCase().includes(filter) ||
        data.name.toLowerCase().includes(filter) ||
        data.nafTitle.toLowerCase().includes(filter)
      );
    };

    // Set the filter on the data source
    this.dataSource.filter = filterValue;
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
        this.filteredCompanies = response;
        this.dataSource.data = response;
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
    const employee = element.employees?.[0];
    return employee ? `${employee.firstName} ${employee.lastName}` : '';
  }
}
