import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Editor, Toolbar } from 'ngx-editor';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { routes } from 'src/app/core/helpers/routes/routes';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/core/services/project.service';
import { CommonService } from 'src/app/core/services/common/common.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CandidateService } from 'src/app/core/services/condidate.service';

declare var bootstrap: any;
@Component({
  selector: 'app-projects-details',
  templateUrl: './projects-details.component.html',
  styleUrls: ['./projects-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsDetailsComponent implements OnInit, OnDestroy {
  public routes = routes;

  public details = [];
  public pojectId: string | null = '';
  offer: any = null;
  baseUrl = environment.apiUrl;
  form: FormGroup;
  candidateId: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private commonService: CommonService,
    private sanitizer: DomSanitizer,
    private candidateService: CandidateService,
    private cdr: ChangeDetectorRef
  ) {
    this.form = new FormGroup({
      message: new FormControl('', Validators.required),
    });
  }

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

  ngOnInit(): void {
    this.pojectId = this.route.snapshot.paramMap.get('id');
    this.editor = new Editor();

    const email = localStorage.getItem('email');

    if (!email) {
      console.error('No email found in local storage.');
      return;
    }

    this.candidateService.getCandidate(email).subscribe({
      next: (response) => {
        this.candidateId = response?.id;
        this.getProjectDetails(this.pojectId, this.candidateId);
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getProjectDetails(projectId: string | null, candidateId?: string | null) {
    this.projectService.getProjectDetails(projectId, candidateId).subscribe({
      next: (res) => {
        this.offer = res;
        this.cdr.markForCheck();
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

  onSubmit() {
    this.form.markAllAsTouched(); // Mark all fields as touched

    if (this.form.valid) {
      // Proceed with the submission logic
      const offerId = this.offer?.id;
      const candidateId = this.candidateId;
      const message = this.form.value;

      if (offerId && candidateId) {
        this.projectService
          .assignCandidate(offerId, candidateId, message)
          .subscribe({
            next: (res) => {
              console.log(res);
              // Show success modal or perform other actions
              this.hideModal('file');
              // Show the modal programmatically
              const modalElement = document.getElementById('success');
              const modal = new bootstrap.Modal(modalElement);
              modal.show();

              this.getProjectDetails(this.pojectId, this.candidateId);
            },
            error: (err) => {
              console.error(err);
            },
          });
      }
    } else {
      // Prevent modal from closing
      alert('Veuillez ajouter un message au recruteur avant de soumettre.');
    }
  }

  hideModal(id: string) {
    const modalElement = document.getElementById(id);
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }
}
