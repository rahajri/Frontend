import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { empprojects } from 'src/app/core/models/models';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CompanyService } from 'src/app/core/services/company.service';
import { ProjectService } from 'src/app/core/services/project.service';

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
    private companyService: CompanyService
  ) {
    this.dataservice.ManageUsers.subscribe((data: Array<empprojects>) => {
      this.empprojects = data;
    });
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.getCompany(this.user?.id);
  }

  getCompany(userId: string) {
    this.companyService.getCompanyByUserId(userId).subscribe({
      next: (company) => {
        this.company = company;
        this.loadJobOffers(company?.id);
      },
      error(err) {
        console.error(err);
      },
    });
  }

  loadJobOffers(companyId: string): void {
    const offset = (this.currentPage - 1) * this.itemsPerPage;
    this.projectService
      .getJobOffers(offset, this.itemsPerPage, companyId)
      .subscribe((data) => {
        console.log('res', data);

        // Destructure the response
        const [items, totalCount] = data;

        // Assign job offers and total item count
        this.jobOffers = items;
        this.totalItems = totalCount;

        // Calculate total pages using totalCount
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

        // Debugging logs
        console.log('totalPages', this.totalPages);
        console.log('itemsPerPage', this.itemsPerPage);
        console.log('totalItems', this.totalItems);
        console.log('items', items);
      });
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
