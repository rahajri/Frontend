import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { empprojects } from 'src/app/core/models/models';
import { environment } from 'src/environments/environment';
import { ProjectService } from 'src/app/core/services/project.service';
import { CompanyService } from 'src/app/core/services/company.service';
import { CommonService } from 'src/app/core/services/common/common.service';

@Component({
  selector: 'app-completed-projects',
  templateUrl: './completed-projects.component.html',
  styleUrls: ['./completed-projects.component.scss'],
})
export class CompletedProjectsComponent implements OnInit, OnDestroy {
  public routes = routes;
  companyId: null | string = null;
  baseUrl = environment.apiUrl;

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

  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  form = new FormGroup({
    editorContent: new FormControl('', Validators.required()),
  });

  ngOnInit(): void {
    this.editor = new Editor();
    this.companyService.companyId$.subscribe((companyId) => {
      this.companyId = companyId;
      this.getClosedOffersByCompany();
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  getClosedOffersByCompany() {
    const companyId = this.companyId;
    if (companyId) {
      this.projectService
        .getClosedOffersByCompany(
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
      this.getClosedOffersByCompany();
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
