import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';
import { ProjectService } from 'src/app/core/services/project.service';
import { IaService } from 'src/app/core/services/ia.service';
import { environment } from 'src/environments/environment';
import { CommonService } from 'src/app/core/services/common/common.service';

@Component({
  selector: 'app-maching',
  templateUrl: './maching.component.html',
  styleUrls: ['./maching.component.scss'],
})
export class MachingComponent {
  public routes = routes;
  offerId: string | null = '';
  matchingOffers: any[] = [];
  isLoading: boolean = false;
  errorMessage: string | null = null;
  offer: any | null;
  isExpanded: boolean = false;
  selectedCandidate: any = null;
  globalError: boolean = false;
  baseUrl = environment.apiUrl;

  profileId: any;

  currentPage = 1;
  itemsPerPage = 5;

  constructor(
    private projectService: ProjectService,
    private iaService: IaService,
    private commonService: CommonService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.offerId = this.route.snapshot.paramMap.get('id');
    if (this.offerId) {
      this.getOfferDetails();
      this.loadMatchingOffers();
    }
  }

  async loadMatchingOffers(): Promise<void> {
    if (!this.offerId) return;

    this.isLoading = true;
    this.errorMessage = null;

    try {
      this.matchingOffers = await this.iaService.iaCandidates(this.offerId);
      // Process the results if needed
    } catch (error) {
      console.error('Failed to load matching offers:', error);
      this.errorMessage = 'Failed to load matching offers. Please try again.';
      // You might want to show this error in your template
    } finally {
      this.isLoading = false;
    }
  }

  getDate(isoDate: string) {
    return this.commonService.formatDate(isoDate);
  }

  get totalPages(): number {
    const offersLength = this.offer?.candidateJobOffers?.length || 0; // Default to 0 if undefined
    return Math.ceil(offersLength / this.itemsPerPage);
  }
  parseFloat(sim: any) {
    return parseFloat(sim.toFixed(2));
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

  getOfferDetails() {
    const offerId = this.offerId;
    if (offerId) {
      this.projectService.getProjectDetails(offerId).subscribe({
        next: (res) => {
          this.offer = res;
        },
        error: (err) => {
          console.error(err);
          this.globalError = true;
        },
      });
    }
  }

  changePage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  trackOffer(index: number, offer: any): number {
    return offer.id; // Use the unique identifier
  }

  setSelectedCandidate(company: any): void {
    this.selectedCandidate = company;
  }

  toggleReadMore() {
    this.isExpanded = !this.isExpanded;
  }

  // Optional: Add a retry method for your template
  retry(): void {
    this.loadMatchingOffers();
  }
}
