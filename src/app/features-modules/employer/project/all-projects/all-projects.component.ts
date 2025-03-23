import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';
import { ProjectService } from 'src/app/core/services/project.service';
import { Subscription } from 'rxjs';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.scss'],
})
export class AllProjectsComponent {
  subscription: Subscription | null = null;
  jobOffers: JobOffer[] = [];
  totalItems: number = 100; // Total d'éléments, ajustez selon les données renvoyées par votre API
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 10;
  user: any;
  company: any;

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
          this.loadJobOffers(profile.company?.id);
        }
      },
      error: (err) => console.error(err),
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe(); // Clean up the subscription
  }

  loadJobOffers(companyId: string): void {
    this.projectService
      .getJobOffers(this.currentPage, this.itemsPerPage, companyId)
      .subscribe((response) => {
        // Destructure the response
        const { data, total, page, lastPage } = response;
        // Assign job offers and total item count
        this.jobOffers = data;
        this.totalItems = total;
        this.totalPages = lastPage;
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

  changePage(page: number): void {
    this.currentPage = page;
    this.loadJobOffers(this.company?.id);
  }
}

interface JobOffer {
  id: string;
  title: string;
  startDate: string;
  endDate: string | null;
  expectedDuration: number;
  timeUnit: string | null;
  createdAt: Date;
  publicationDate: Date;
  job: {
    name: string;
  };
  contractType: {
    description: string;
    isRenewable: boolean;
  };
  city: {
    name: string;
  };
  company: {
    name: string;
    siret: string;
    email: string | null;
    phone: string | null;
    naf: string;
    nafTitle: string;
    category: string;
    workforce: number;
    message: string;
    establishedDate: Date | null;
    createdAt: Date;
    updatedAt: Date;
  };
  status: {
    name: string;
    description: string;
    context: string;
  };
}
