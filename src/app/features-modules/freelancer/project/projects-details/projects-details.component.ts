import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, Editor, Toolbar } from 'ngx-editor';
import { FormControl, FormGroup } from '@angular/forms';
import { routes } from 'src/app/core/helpers/routes/routes';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/core/services/project.service';
import { CommonService } from 'src/app/core/services/common/common.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CandidateService } from 'src/app/core/services/condidate.service';

@Component({
  selector: 'app-projects-details',
  templateUrl: './projects-details.component.html',
  styleUrls: ['./projects-details.component.scss'],
})
export class ProjectsDetailsComponent implements OnInit, OnDestroy {
  public routes = routes;

  public details = [];
  public pojectId: string | null = '';
  offer: any = null;
  baseUrl = environment.apiUrl;

  candidateId: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private commonService: CommonService,
    private sanitizer: DomSanitizer,
    private candidateService: CandidateService
  ) {}

  addDetails(array: number[]) {
    array.push(1);
  }
  deleteDetails(array: number[], index: number) {
    this.details.splice(index, 1);
  }

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
    this.pojectId = this.route.snapshot.paramMap.get('id');
    this.editor = new Editor();
    this.getProjectDetails();

    const email = localStorage.getItem('email');

    if (!email) {
      console.error('No email found in local storage.');
      return;
    }

    this.candidateService.getCandidate(email).subscribe({
      next: (response) => {
        this.candidateId = response?.id;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getProjectDetails() {
    this.projectService.getProjectDetails(this.pojectId).subscribe({
      next: (res) => {
        this.offer = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.editor) {
      this.editor.destroy();
    }
  }

  navigation() {
    this.router.navigate([routes.employee_dashboard]);
  }

  navigation1() {
    const offerId = this.offer?.id;
    const candidateId = this.candidateId;
    if (offerId && candidateId) {
      this.projectService.assignCandidate(offerId, candidateId).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
    // this.router.navigate([routes.freelancer_projects_proposals]);
  }

  getDate(isoDate: string) {
    return this.commonService.formatDate(isoDate);
  }

  getFirstTwoLanguages(jobOfferLanguages: any[]): string {
    if (!Array.isArray(jobOfferLanguages) || jobOfferLanguages.length === 0) {
      return '';
    }

    return jobOfferLanguages
      .slice(0, 2) // Take only the first two elements
      .map((lang) => lang?.language?.name) // Extract language names
      .join(', '); // Join them with a comma
  }

  getFirstTwoLanguagesLevel(jobOfferLanguages: any[]): string {
    if (!Array.isArray(jobOfferLanguages) || jobOfferLanguages?.length === 0) {
      return '';
    }

    return jobOfferLanguages
      .slice(0, 2) // Take only the first two elements
      .map((lang) => lang?.level) // Extract language names
      .join(', '); // Join them with a comma
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
}
