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
  isExpanded: boolean = false;

  currentPage = 1;
  itemsPerPage = 5;

  constructor(
    private route: ActivatedRoute,
    private readonly projectService: ProjectService,
    private commonService: CommonService
  ) {}
  ngOnInit() {
    this.offerId = this.route.snapshot.paramMap.get('id');
    this.getOfferDetails();
  }

  trackOffer(index: number, offer: any): number {
    return offer.id; // Use the unique identifier
  }

  toggleReadMore() {
    this.isExpanded = !this.isExpanded;
  }

  getOfferDetails() {
    const offerId = this.offerId;
    if (offerId) {
      this.projectService.getProjectDetails(offerId).subscribe({
        next: (res) => {
          this.offer = res;
          // Ensure candidateJobOffers is initialized
          if (!this.offer.candidateJobOffers) {
            this.offer.candidateJobOffers = [];
          }
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

  get totalPages(): number {
    const offersLength = this.offer?.candidateJobOffers?.length || 0; // Default to 0 if undefined
    return Math.ceil(offersLength / this.itemsPerPage);
  }

  get paginatedOffers() {
    if (!this.offer || !this.offer.candidateJobOffers) {
      return []; // Return an empty array if offer or candidateJobOffers is null
    }
    const start = (this.currentPage - 1) * this.itemsPerPage;
    if (start < 0 || start >= this.offer.candidateJobOffers.length) {
      return []; // Prevent invalid slicing
    }
    return this.offer.candidateJobOffers.slice(
      start,
      start + this.itemsPerPage
    );
  }

  changePage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
