import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';
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
  companyId: null | string = null;

  offers: any[] = [];
  paginatedOffers: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  constructor(
    public router: Router,
    private projectService: ProjectService,
    private companyService: CompanyService,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.companyService.companyId$.subscribe((companyId) => {
      this.companyId = companyId;
      this.getAvailableOffersByCompany();
    });
  }

  getAvailableOffersByCompany() {
    const companyId = this.companyId;
    if (companyId) {
      this.projectService
        .getAvailableOffersByCompany(
          companyId,
          this.currentPage,
          this.itemsPerPage
        )
        .subscribe({
          next: (res) => {
            this.offers = res.offers;
            this.totalPages = Math.ceil(res.total / this.itemsPerPage);
            this.paginatedOffers = this.offers;
          },
          error: (err) => {
            console.error(err);
          },
        });
    } else {
      this.offers = [];
      this.paginatedOffers = this.offers;
    }
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getAvailableOffersByCompany();
    }
  }

  getDate(isoDate: string) {
    return this.commonService.formatDate(isoDate);
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
}
