import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/core/services/project.service';
import { CommonService } from 'src/app/core/services/common/common.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfileService } from 'src/app/core/services/profile.service';
import { MessageService } from 'src/app/core/services/message.service';

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
  selectedCandidate: any = null;
  globalError: boolean = false;

  currentPage = 1;
  itemsPerPage = 5;
  sendForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private readonly projectService: ProjectService,
    private commonService: CommonService,
    private profileService: ProfileService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.sendForm = this.fb.group({
      closeOffer: [false],
      message: [''], // Add a form control for the message
    });
  }

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
          this.globalError = true;
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

  setSelectedCandidate(company: any): void {
    this.selectedCandidate = company;
  }

  sendMessage() {
    const profileId = this.profileService.profileId;
    const formData = {
      closeOffer: this.sendForm.value.closeOffer,
      offer: this.offer?.id,
      message: this.sendForm.value.message,
      candidateId: this.selectedCandidate?.id, // Assuming selectedCandidate has an id
      employerId: profileId,
    };

    console.log(formData);
    this.messageService.sendMessageToAdmins(formData).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.error(err);
      },
    });

  }
}
