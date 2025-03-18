import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/core/services/project.service';
import { CommonService } from 'src/app/core/services/common/common.service';

@Component({
  selector: 'app-project-employer-view-proposal',
  templateUrl: './project-employer-view-proposal.component.html',
  styleUrls: ['./project-employer-view-proposal.component.scss'],
})
export class ProjectEmployerViewProposalComponent {
  public routes = routes;
  offerId: string | null = null;
  offer: any | null;

  constructor(
    private route: ActivatedRoute,
    private readonly projectService: ProjectService,
    private commonService: CommonService
  ) {}
  ngOnInit() {
    this.offerId = this.route.snapshot.paramMap.get('id');
    this.getOfferDetails();
  }

  getOfferDetails() {
    const offerId = this.offerId;
    if (offerId) {
      this.projectService.getProjectDetails(offerId).subscribe({
        next: (res) => {
          this.offer = res;
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }

  getFullName(firstName: string, lastName: string) {
    return [
      firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase(),
      lastName.toUpperCase(),
    ]
      .filter(Boolean) // Ensure no extra spaces when either name is missing
      .join(' ');
  }

  getDate(isoDate: string) {
    return this.commonService.formatDate(isoDate);
  }
}
