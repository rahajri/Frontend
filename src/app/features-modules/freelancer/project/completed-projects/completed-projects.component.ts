import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';
import { ProjectService } from 'src/app/core/services/project.service';
import { Subscription } from 'rxjs';
import { ProfileService } from 'src/app/core/services/profile.service';
@Component({
  selector: 'app-completed-projects',
  templateUrl: './completed-projects.component.html',
  styleUrls: ['./completed-projects.component.scss'],
})
export class CompletedProjectsComponent {
  subscription: Subscription | null = null;
  candidatures: any = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  user: any;
  company: any;
  candidateId: string | null = null;

  public routes = routes;
  constructor(
    public router: Router,
    private projectService: ProjectService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.candidateId = this.profileService.profileId;
    if (this.candidateId) {
      this.loadJobOffers();
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe(); // Clean up the subscription
  }

  loadJobOffers(): void {
    if (!this.candidateId) {
      console.error('Candidate id can not be null');
      return;
    }

    this.projectService
      .getCandidateCandidatures(
        this.currentPage,
        this.itemsPerPage,
        this.candidateId,
        'Accepted'
      )
      .subscribe({
        next: (res) => {
          // Destructure the response
          const { data, total } = res;
          // Assign job offers and total item count
          this.candidatures = data;
          this.totalPages = Math.ceil(total / this.itemsPerPage);
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

  getStatusClass = (status: string): string => {
    switch (status) {
      case 'Rejected':
        return 'Refusée';
      case 'Accepted':
        return 'Acceptée';
      default:
        return 'En Cours...';
    }
  };
}
