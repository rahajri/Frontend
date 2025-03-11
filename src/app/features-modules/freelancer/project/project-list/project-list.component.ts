import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';
import { ProjectService } from 'src/app/core/services/project.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { showSuccessModal } from 'src/app/core/services/common/common-functions';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { SpinnerService } from 'src/app/core/services/spinner/spinner.service';

interface data {
  value: string;
}
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent {
  public routes = routes;
  public selectedValue1 = '';
  public like: boolean[] = [false];
  baseUrl = environment.apiUrl;
  isLogged: boolean = false;
  offers: any[] = [];
  globalErrorMessage: boolean = false;
  activities: any[] = [];
  displayedActivities = 5;
  subActivities: any[] = [];
  displayedSubActivities = 5;
  contractTypes: any[] = [];
  filter: boolean = false;
  filterForm!: FormGroup;

  selectedActivities: string[] = [];
  selectedSubActivities: string[] = [];
  selectedContractTypes: string[] = [];

  public currentPage: number = 1;
  public itemsPerPage: number = 5; // Adjust based on your needs
  public totalOffers: number = 0; // Total number of offers
  public paginatedOffers: any[] = []; // Offers for the current page

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private projectService: ProjectService,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private spinner: SpinnerService
  ) {
    this.filterForm = this.fb.group({
      title: [''],
      city: [''],
      department: [''],
      region: [''],
    });
  }

  toggleLike(index: number) {
    this.like[index] = !this.like[index];
  }

  ngOnInit(): void {
    this.spinner.hide();
    this.isLogged = this.authService.isAuthenticated;
    this.getOffers();
    this.getActivities();
    this.getSubActivities();
    this.getContractTypes();
  }

  onChange() {
    const filterValues = this.filterForm.value;
    const isEmpty = Object.values(filterValues).some((value) => value === '');
    if (isEmpty) {
      this.getOffers();
    }
  }

  getOffers() {
    this.projectService.getPublishedOffers().subscribe({
      next: (data) => {
        this.offers = data;
        this.totalOffers = data.length;
        this.updatePaginatedOffers();
      },
      error: (error) => {
        console.error(error);
        this.globalErrorMessage = true;
      },
    });
  }

  updatePaginatedOffers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedOffers = this.offers.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  getContractTypes() {
    this.projectService.getContractTypes().subscribe({
      next: (data) => {
        this.contractTypes = data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getSafeDescription(description: string): SafeHtml {
    const text = this.extractText(description);
    const limitedText = this.limitWords(text, 25);
    return this.sanitizer.bypassSecurityTrustHtml(limitedText);
  }

  extractText(html: string): string {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.innerText || tempDiv.textContent || '';
  }

  limitWords(text: string, limit: number): string {
    const words = text.split(' ');
    const limitedWords = words.slice(0, limit).join(' ');
    return limitedWords + (words.length > limit ? '...' : '');
  }

  getActivities() {
    this.projectService.getActivities().subscribe({
      next: (data) => {
        this.activities = data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  showMore() {
    if (this.displayedActivities + 5 <= this.activities.length) {
      this.displayedActivities += 5;
    } else {
      this.displayedActivities = this.activities.length; // Show all if fewer than 5 remain
    }
  }

  postulerBtn(id: string | null) {
    if (id && this.isLogged) {
      this.router.navigate([routes.get_freelancer_project_details(id)]);
    } else {
      showSuccessModal('not-connected');
    }
  }

  showLess() {
    if (this.displayedActivities - 5 >= 5) {
      this.displayedActivities -= 5;
    } else {
      this.displayedActivities = 5; // Reset to initial state
    }
  }

  getSubActivities() {
    this.projectService.getSubActivities().subscribe({
      next: (data) => {
        this.subActivities = data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  showMoreSubActivities() {
    if (this.displayedSubActivities + 5 <= this.subActivities.length) {
      this.displayedSubActivities += 5;
    } else {
      this.displayedSubActivities = this.subActivities.length; // Show all if fewer than 5 remain
    }
  }

  showLessSubActivities() {
    if (this.displayedSubActivities - 5 >= 5) {
      this.displayedSubActivities -= 5;
    } else {
      this.displayedSubActivities = 5; // Reset to initial state
    }
  }

  openFilter() {
    this.filter = !this.filter;
  }

  onFilterSubmit() {
    if (this.filterForm.valid) {
      this.filterOffers(this.filterForm.value);
    }
  }

  filterOffers(data: any) {
    this.projectService.projectsFiler(data).subscribe({
      next: (response) => {
        this.paginatedOffers = response;
        this.totalOffers = response.length;
        this.offers = response;
        this.updatePaginatedOffers();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  goToPage(page: number) {
    if (page < 1 || page > this.getTotalPages()) return; // Prevent invalid pages
    this.currentPage = page;
    this.updatePaginatedOffers();
  }

  nextPage() {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      this.updatePaginatedOffers();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedOffers();
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.totalOffers / this.itemsPerPage);
  }

  onActivityChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedActivities.push(checkbox.value);
    } else {
      this.selectedActivities = this.selectedActivities.filter(
        (activity) => activity !== checkbox.value
      );
    }
  }

  onSubActivityChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedSubActivities.push(checkbox.value);
    } else {
      this.selectedSubActivities = this.selectedSubActivities.filter(
        (subActivity) => subActivity !== checkbox.value
      );
    }
  }

  onContractTypeChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedContractTypes.push(checkbox.value);
    } else {
      this.selectedContractTypes = this.selectedContractTypes.filter(
        (contractType) => contractType !== checkbox.value
      );
    }
  }

  applyFilters() {
    this.projectService
      .projectsFilerCheckBoxes({
        selectedActivities: this.selectedActivities,
        selectedSubActivities: this.selectedSubActivities,
        selectedContractTypes: this.selectedContractTypes,
      })
      .subscribe({
        next: (response) => {
          this.paginatedOffers = response;
          this.totalOffers = response.length;
          this.offers = response;
          this.updatePaginatedOffers();
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  resetFilters() {
    this.selectedActivities = [];
    this.selectedSubActivities = [];
    this.selectedContractTypes = [];
    // Uncheck all checkboxes in the UI
    const activityCheckboxes = document.querySelectorAll(
      'input[name="select_activity"]'
    );
    const subActivityCheckboxes = document.querySelectorAll(
      'input[name="select_subactivity"]'
    );
    const contractTypeCheckboxes = document.querySelectorAll(
      'input[name="select_contractType"]'
    );

    activityCheckboxes.forEach((checkbox) => {
      (checkbox as HTMLInputElement).checked = false;
    });

    subActivityCheckboxes.forEach((checkbox) => {
      (checkbox as HTMLInputElement).checked = false;
    });

    contractTypeCheckboxes.forEach((checkbox) => {
      (checkbox as HTMLInputElement).checked = false;
    });

    this.getOffers();
  }
}
