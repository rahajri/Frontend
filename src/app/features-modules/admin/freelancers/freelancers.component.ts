import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Candidate } from 'src/app/core/models/models';
import { routes } from 'src/app/core/helpers/routes/routes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationService } from 'src/app/core/services/location.service';
import { UserService } from '../../auth/service/user.service';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { CommonService } from 'src/app/core/services/common/common.service';
import { CandidateService } from 'src/app/core/services/condidate.service';
import {
  markFormGroupTouched,
  showSuccessModal,
  toggleAllCheckboxes,
} from 'src/app/core/services/common/common-functions';
declare var bootstrap: any;

@Component({
  selector: 'app-freelancers',
  templateUrl: './freelancers.component.html',
  styleUrls: ['./freelancers.component.scss'],
})
export class FreelancersComponent {
  dataSource: MatTableDataSource<Candidate>;
  displayedColumns: string[] = [
    'ckeckbox',
    'candidate',
    'phone',
    'profileTitle',
    'emailVerifiedAt',
    'createdAt',
    'lastConnexion',
    'status',
    'action',
  ];
  public routes = routes;
  public lstProject!: Array<Candidate>;
  public searchDataValue = '';
  filterForm!: FormGroup;
  addCandidateForm!: FormGroup;

  filter: boolean = false;
  candidatesData: any[] = [];
  filteredCandidates: any[] = [];
  selectedStatus: string | null = null;
  countCandidates: number = 0;
  initials: string = '';
  userEmail: string = '';
  baseUrl = environment.apiUrl;

  candidateToDelete: any;
  selectedHederTitle = 'Tous les';

  //** / pagination variables
  constructor(
    public router: Router,
    private candidateService: CandidateService,
    private fb: FormBuilder,
    private locationService: LocationService,
    private userService: UserService,
    private commonService: CommonService
  ) {
    this.dataSource = new MatTableDataSource<Candidate>([]);
    this.filterForm = this.fb.group({
      profileTiltle: [''],
      firstName: [''],
      lastName: [''],
      city: [''],
      department: [''],
      region: [''],
    });

    this.addCandidateForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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

  filterCandidatesByStatus(status: string | null): void {
    this.selectedHederTitle = this.getTranslation(status);
    this.selectedStatus = status;
    if (!status) {
      // If no status is provided, return all companies
      this.filteredCandidates = this.candidatesData;
      this.dataSource.data = this.filteredCandidates;
    } else {
      // Filter companies based on the status name
      this.filteredCandidates = this.candidatesData.filter(
        (company: any) => company.status?.name === status
      );
      this.dataSource.data = this.filteredCandidates;
    }
    this.countCandidates = this.filteredCandidates.length;
  }

  private getTableData(): void {
    this.candidateService.getallCandidates().subscribe({
      next: (response) => {
        this.candidatesData = response;
        this.filteredCandidates = response;
        this.dataSource = new MatTableDataSource(response);
        this.countCandidates = response.length;
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
      this.filterCandidates({
        ...this.filterForm.value,
        status: this.selectedStatus,
      });
    }
  }

  searchData(target: any) {
    const filterValue = target.value.trim().toLowerCase();

    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const contact = (data?.firstName || '') + ' ' + (data?.lastName || '');
      const phone = data?.phone || '';
      const profileTitle = data?.profileTitle || '';

      return (
        contact.toLowerCase().includes(filter) ||
        phone.toLowerCase().includes(filter) ||
        profileTitle.toLowerCase().includes(filter)
      );
    };

    this.dataSource.filter = filterValue;
  }

  getTranslation(key: string | null): string {
    if (key === null) {
      return 'Tous les';
    } else {
      const translations: { [key: string]: string } = {
        Active: 'Actifs',
        Inactive: 'Inactifs',
        Hired: 'Embauchés',
      };
      return translations[key] || key;
    }
  }

  deleteCandidate(candidate: any) {
    this.candidateService.deleteCandidate(candidate?.id).subscribe({
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
    this.candidateToDelete = company;
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

  filterCandidates(data: any) {
    this.candidateService.candidatesFiler(data).subscribe({
      next: (response) => {
        this.filteredCandidates = response;
        this.dataSource.data = response;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getInitials(element: any) {
    const { fullName, initials } = this.userService.getProfileDetails(element);
    return initials;
  }

  onCandidateSubmit() {
    markFormGroupTouched(this.addCandidateForm);
    if (this.addCandidateForm.valid) {
      this.userEmail = this.addCandidateForm.get('email')?.value;
      this.candidateService
        .adminCreateUser(this.addCandidateForm.value)
        .subscribe({
          next: (response) => {
            this.hideModal('add-candidat');
            this.getTableData();
            this.addCandidateForm.reset();
            showSuccessModal('success-added', false);
          },
          error: (error) => {
            console.error('Error creating client:', error);
          },
        });
    } else {
      console.log('invalid');
    }
  }

  getContact(element: any): string {
    if (!element) {
      return ''; // Return an empty string if the element is null or undefined
    }

    // Format first name: First letter uppercase, rest lowercase
    const firstName =
      element.firstName.charAt(0).toUpperCase() + // First letter uppercase
      element.firstName.slice(1).toLowerCase(); // Rest lowercase

    // Format last name: All uppercase
    const lastName = element.lastName.toUpperCase();

    // Return the formatted name
    return `${firstName} ${lastName}`;
  }

  toggleCheckBoxes(event: Event) {
    toggleAllCheckboxes(event);
  }

  async copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      this.showCopiedNotification();
    } catch (err) {
      console.error('Échec de la copie :', err);
    }
  }

  // Méthode pour afficher une notification
  showCopiedNotification() {
    const parent = document.querySelector('.parent') as HTMLElement;

    const notification = document.createElement('div');
    notification.textContent = 'Copié !';

    // Style de base
    notification.style.position = 'absolute';
    notification.style.bottom = '220px';
    notification.style.right = '20px';
    notification.style.padding = '12px 24px';
    notification.style.background = '#28a745';
    notification.style.color = 'white';
    notification.style.borderRadius = '8px';
    notification.style.zIndex = '1000';
    notification.style.transform = 'translateY(20px)';
    notification.style.opacity = '0';
    notification.style.transition = 'all 0.3s ease';

    parent.appendChild(notification);

    // Déclencher l'animation
    setTimeout(() => {
      notification.style.transform = 'translateY(0)';
      notification.style.opacity = '1';
    }, 10);

    // Suppression avec animation
    setTimeout(() => {
      notification.style.transform = 'translateY(-20px)';
      notification.style.opacity = '0';
      setTimeout(() => {
        parent.removeChild(notification);
      }, 300);
    }, 1500);
  }

  requestLogin(email: string) {
    this.candidateService.sendWelcomeMail(email).subscribe({
      next: (response) => {
        this.hideModal('success-added');
      },
      error: (error) => {
        console.error('Error creating client:', error);
      },
    });
  }
}
