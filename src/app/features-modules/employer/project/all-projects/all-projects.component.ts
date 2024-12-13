import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { empprojects } from 'src/app/core/models/models';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ProjectService } from 'src/app/core/services/project.service';
import { UserService } from 'src/app/features-modules/auth/service/user.service';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.scss'],
})
export class AllProjectsComponent {
  jobOffers: JobOffer[] = [];
  totalItems: number = 100; // Total d'éléments, ajustez selon les données renvoyées par votre API
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 10;
  user: any;
  company: any;

  public routes = routes;
  empprojects: Array<empprojects> = [];
  constructor(
    public router: Router,
    private dataservice: ShareDataService,
    private projectService: ProjectService,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.dataservice.ManageUsers.subscribe((data: Array<empprojects>) => {
      this.empprojects = data;
    });
  }

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (profile) => {
        this.user = profile;
        this.company = profile.company;
        this.loadJobOffers(profile?.company?.id);
      },
      error: (err) => console.error(err),
    });
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
