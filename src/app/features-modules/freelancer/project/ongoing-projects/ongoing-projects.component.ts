import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { routes } from 'src/app/core/helpers/routes/routes';
import { IaService } from 'src/app/core/services/ia.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-ongoing-projects',
  templateUrl: './ongoing-projects.component.html',
  styleUrls: ['./ongoing-projects.component.scss'],
})
export class OngoingProjectsComponent {
  public routes = routes;
  baseUrl = environment.apiUrl;
  public like: boolean[] = [false];
  offers: any[] = [];
  totalOffers: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  candidateId: string | null = null;
  isLoading: boolean = false;
  errorMessage: string | null = null;
  matchingOffers: any[] = [];

  constructor(
    private iaService: IaService,
    public router: Router,
    private sanitizer: DomSanitizer,
    private profileService: ProfileService
  ) {}
  ngOnInit(): void {
    this.candidateId = this.profileService.profileId;
    if (this.candidateId) {
      this.loadMatchingOffers();
    }
  }

  async loadMatchingOffers(): Promise<void> {
    if (!this.candidateId) return;

    this.isLoading = true;
    this.errorMessage = null;

    try {
      this.matchingOffers = await this.iaService.iaOffers(this.candidateId);
      // Process the results if needed
    } catch (error) {
      console.error('Failed to load matching offers:', error);
      this.errorMessage = 'Failed to load matching offers. Please try again.';
      // You might want to show this error in your template
    } finally {
      this.isLoading = false;
    }
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadMatchingOffers();
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

  postulerBtn(id: string) {
    this.router.navigate([routes.get_freelancer_project_details(id)]);
  }

  getSafeDescription(description: string): SafeHtml {
    const text = this.extractText(description);
    const limitedText = this.limitWords(text, 25);
    return this.sanitizer.bypassSecurityTrustHtml(limitedText);
  }

  extractText(html: string): string {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.innerText || tempDiv.textContent || '';
  }

  limitWords(text: string, limit: number): string {
    const words = text.split(' ');
    const limitedWords = words.slice(0, limit).join(' ');
    return limitedWords + (words.length > limit ? '...' : '');
  }

  toggleLike(index: number) {
    this.like[index] = !this.like[index];
  }
}
