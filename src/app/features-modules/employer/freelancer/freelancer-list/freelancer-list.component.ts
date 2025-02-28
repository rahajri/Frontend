import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { freelancerlist } from 'src/app/core/models/models';
import { ProjectService } from 'src/app/core/services/project.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-freelancer-list',
  templateUrl: './freelancer-list.component.html',
  styleUrls: ['./freelancer-list.component.scss'],
})
export class FreelancerListComponent {
  public routes = routes;
  baseUrl = environment.apiUrl;
  selected = 'Relevance';
  offers: any[] = [];
  freelancer: Array<freelancerlist> = [];
  globalErrorMessage: boolean = false;
  constructor(
    public router: Router,
    private dataservice: ShareDataService,
    private projectService: ProjectService
  ) {
    this.dataservice.ManageUsers1.subscribe((data: Array<freelancerlist>) => {
      this.freelancer = data;
    });
  }

  ngOnInit(): void {
    this.getOffers();
  }

  getOffers() {
    this.projectService.getPublishedOffers().subscribe({
      next: (data) => {
        this.offers = data;
        console.log(data);
      },
      error: (error) => {
        console.error(error);
        this.globalErrorMessage = true;
      },
    });
  }
}
