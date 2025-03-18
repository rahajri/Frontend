import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { empprojects } from 'src/app/core/models/models';
import { CommonService } from 'src/app/core/services/common/common.service';
import { CompanyService } from 'src/app/core/services/company.service';
import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-pending-projects',
  templateUrl: './pending-projects.component.html',
  styleUrls: ['./pending-projects.component.scss'],
})
export class PendingProjectsComponent {
  public routes = routes;
  empprojects: Array<empprojects> = [];
  companyId: null | string = null;
  offers: any[] | [] = [];
  constructor(
    public router: Router,
    private dataservice: ShareDataService,
    private projectService: ProjectService,
    private companyService: CompanyService,
    private commonService: CommonService
  ) {
    this.dataservice.ManageUsers.subscribe((data: Array<empprojects>) => {
      this.empprojects = data;
    });
  }

  ngOnInit() {
    this.companyService.companyId$.subscribe((companyId) => {
      this.companyId = companyId;
    });

    this.getAvailableOffersByCompany();
  }

  getAvailableOffersByCompany() {
    const companyId = this.companyId;
    if (companyId) {
      this.projectService.getAvailableOffersByCompany(companyId).subscribe({
        next: (res) => {
          this.offers = res;
        },
        error: (err) => {
          console.error(err);
        },
      });
    } else {
      this.offers = [];
    }
  }

  getDate(isoDate: string) {
    return this.commonService.formatDate(isoDate);
  }
}
