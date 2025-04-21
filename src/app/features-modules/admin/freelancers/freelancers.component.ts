import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { Candidate } from 'src/app/core/models/models';
import { routes } from 'src/app/core/helpers/routes/routes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../auth/service/user.service';
import { environment } from 'src/environments/environment';
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
  public lstBoard: Candidate[] = [];
  public routes = routes;
  public lstProject!: Array<Candidate>;
  public searchDataValue = '';
  filterForm!: FormGroup;
  addCandidateForm!: FormGroup;

  candidatesData: any[] = [];
  filteredCandidates: any[] = [];
  selectedStatus: string | null = null;
  countCandidates: number = 0;
  initials: string = '';
  userEmail: string = '';
  baseUrl = environment.apiUrl;
  isSubmitting: boolean = false;

  candidateToDelete: any;
  selectedHederTitle = 'Tous les';

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
  public filter: boolean = false;

  //** / pagination variables
  constructor(
    public router: Router,
    private candidateService: CandidateService,
    private fb: FormBuilder,
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
      this.lstBoard = this.filteredCandidates;
    } else {
      // Filter companies based on the status name
      this.filteredCandidates = this.candidatesData.filter(
        (company: any) => company.status?.name === status
      );
      this.lstBoard = this.filteredCandidates;
    }
    this.countCandidates = this.filteredCandidates.length;
  }

  private getTableData(): void {
    this.lstBoard = [];
    this.serialNumberArray = [];

    this.candidateService
      .getallCandidates(this.currentPage, this.pageSize)
      .subscribe({
        next: (response) => {
          this.candidatesData = response.data;
          this.filteredCandidates = response.data;
          this.totalData = response.total;
          this.countCandidates = response.total;
          response.data.forEach((candidate: any, index: number) => {
            const serialNumber = index + 1;
            if (index >= this.skip && serialNumber <= this.limit) {
              this.lstBoard.push(candidate);
              this.serialNumberArray.push(serialNumber);
            }
          });
          this.dataSource = new MatTableDataSource<any>(this.lstBoard);
          this.calculateTotalPages(this.totalData, this.pageSize);
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

  getDate(isoDate: any) {
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

  public searchData(value: string): void {
    const filterValue = value.trim().toLowerCase();

    this.lstBoard = this.dataSource.data.filter((candidate: Candidate) => {
      // Helper function to safely handle phone number
      const getCleanPhone = (phone: string | null): string => {
        if (!phone) return '';
        return phone.replace(/\s+/g, '').toLowerCase(); // Remove ALL whitespace
      };

      return (
        (candidate.firstName?.toLowerCase() || '').includes(filterValue) ||
        (candidate.lastName?.toLowerCase() || '').includes(filterValue) ||
        getCleanPhone(candidate.phone).includes(filterValue) ||
        (candidate.profileTitle?.toLowerCase() || '').includes(filterValue)
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

  getProfile(candidate: Candidate) {
    candidate.status.name === 'Active'
      ? this.router.navigate([routes.get_admin_candidate(candidate.id)])
      : null;
  }

  showDeleteCategoryModal(company: any) {
    this.candidateToDelete = company;
    const modalElement = document.getElementById('delete_client');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement, {
        animation: false,
      });
      modal.show();
      modalElement.focus();
    }
  }

  hideModal(id: string) {
    const modalElement = document.getElementById(id);
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement, {
        animation: false,
      });
      if (modal) {
        modal.hide();
      }
    }
  }

  filterCandidates(data: any) {
    this.candidateService.candidatesFiler(data).subscribe({
      next: (response) => {
        this.filteredCandidates = response;
        this.lstBoard = response;
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

    if (this.addCandidateForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.userEmail = this.addCandidateForm.get('email')?.value;

      this.candidateService
        .adminCreateUser(this.addCandidateForm.value)
        .subscribe({
          next: (response) => {
            this.hideModal('add-candidat');
            this.getTableData();
            this.addCandidateForm.reset();
            this.isSubmitting = false;
            showSuccessModal('success-added', false);
          },
          error: (error) => {
            console.error('Error creating client:', error);
            this.isSubmitting = false;
          },
        });
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
      case 'companyName':
        return item.jobOffer?.company?.name;
      case 'offerTitle':
        return item.jobOffer?.title;
      case 'contractType':
        return item.jobOffer?.contractType?.description;
      case 'candidate':
        return `${item.candidate?.firstName} ${item.candidate?.lastName}`;
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
}
export interface pageSelection {
  skip: number;
  limit: number;
}
