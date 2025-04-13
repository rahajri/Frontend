import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';
import { ProjectService } from 'src/app/core/services/project.service';
import { Subscription } from 'rxjs';
import { ProfileService } from 'src/app/core/services/profile.service';
import { JobOffer } from 'src/app/core/models/models';

@Component({
  selector: 'app-ongoing-projects',
  templateUrl: './ongoing-projects.component.html',
  styleUrls: ['./ongoing-projects.component.scss'],
})
export class OngoingProjectsComponent {
  subscription: Subscription | null = null;
  jobOffers: JobOffer[] = [];
  totalItems: number = 100; // Total d'éléments, ajustez selon les données renvoyées par votre API
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 10;
  user: any;
  company: any;
  companyId: string = '';

  public routes = routes;
  constructor(
    public router: Router,
    private projectService: ProjectService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.subscription = this.profileService.currentUserProfile$.subscribe({
      next: (profile) => {
        if (profile) {
          this.user = profile;
          this.company = profile.company;
          this.companyId = profile.company?.id;
          this.loadJobOffers();
        }
      },
      error: (err) => console.error(err),
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe(); // Clean up the subscription
  }

  loadJobOffers(): void {
    this.projectService
      .getJobOffers(
        this.currentPage,
        this.itemsPerPage,
        this.companyId,
        'Published'
      )
      .subscribe({
        next: (res) => {
          // Destructure the response
          const { data, total } = res;
          // Assign job offers and total item count
          this.jobOffers = data;
          this.totalPages = Math.ceil(res.total / this.itemsPerPage);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  formatDate(date: any): string {
    if (!date) return '';
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    };

    return new Date(date).toLocaleDateString('fr-FR', options);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadJobOffers();
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    if (this.totalPages <= maxVisiblePages) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = this.currentPage - Math.floor(maxVisiblePages / 2);
      let endPage = this.currentPage + Math.floor(maxVisiblePages / 2);

      if (startPage < 1) {
        startPage = 1;
        endPage = maxVisiblePages;
      }

      if (endPage > this.totalPages) {
        endPage = this.totalPages;
        startPage = this.totalPages - maxVisiblePages + 1;
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  }
}
