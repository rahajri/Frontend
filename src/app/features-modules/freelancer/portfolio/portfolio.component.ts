import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { routes } from 'src/app/core/helpers/routes/routes';
import { CandidateService } from 'src/app/core/services/condidate.service';
import { environment } from 'src/environments/environment';
import { UserService } from '../../auth/service/user.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PdfService } from 'src/app/core/services/pdf.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent {
  public routes = routes;

  public details = [];
  baseUrl = environment.apiUrl;

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
  candidate: any;
  candidateId: string | null = null;
  safeMapUrl?: SafeResourceUrl;

  form = new FormGroup({
    editorContent: new FormControl('', Validators.required()),
  });

  @ViewChild('contentToPrint') contentToPrint!: ElementRef;
  isPdfReady = false;
  isGeneratingPdf = false;
  disable: boolean = false;

  constructor(
    private router: Router,
    private readonly candidateService: CandidateService,
    private readonly userService: UserService,
    private profileService: ProfileService,
    private sanitizer: DomSanitizer,
    private pdfService: PdfService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.candidateId = this.profileService.profileId;
    this.editor = new Editor();
    if (this.candidateId) {
      this.getCandidateInfo(this.candidateId);
    }
    this.loadMap();
  }

  ngAfterViewInit() {
    this.isPdfReady = true;
    this.cdRef.detectChanges(); // Force change detection
  }

  getCandidateInfo(id: string) {
    this.candidateService.getCandidateById(id).subscribe({
      next: (res) => {
        this.candidate = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getDate(isoDate: any): string {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat('en-GB').format(date);
  }

  getFullName(element: any) {
    const { fullName, initials } = this.userService.getProfileDetails(element);
    return fullName;
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
  ngsubmit() {
    this.router.navigate([routes.freelancer_projects_proposals]);
  }

  loadMap() {
    if (!this.candidate?.location)
      return this.sanitizer.bypassSecurityTrustResourceUrl('');

    const postalCode = this.candidate.location.postalCode?.code || '';
    const city = this.candidate.location.city?.name || 'Toulouse';
    const address = this.candidate.location.address || '';

    // Use the basic embed format without API key
    const query = encodeURIComponent(`${address} ${postalCode} ${city}`);
    const url = `https://maps.google.com/maps?q=${query}&output=embed&z=15`;

    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  async downloadPdf() {
    if (!this.isPdfReady || !this.contentToPrint || this.isGeneratingPdf) {
      return;
    }
    this.disable = true;
    this.isGeneratingPdf = true;
    try {
      // Add a small delay to ensure DOM is ready
      await new Promise((resolve) => setTimeout(resolve, 100));

      const fileName = `${this.candidate?.firstName}_${this.candidate?.lastName}_CV.pdf`;
      await this.pdfService.generatePdf(
        this.contentToPrint.nativeElement,
        fileName
      );
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      this.isGeneratingPdf = false;
      this.disable = false;
    }
  }

  getFirstTwoLanguages(candidateLanguages: any[]): string {
    if (!Array.isArray(candidateLanguages) || candidateLanguages.length === 0) {
      return '';
    }

    return candidateLanguages
      .slice(0, 2) // Take only the first two elements
      .map((lang) => lang?.language?.name) // Extract language names
      .join(', '); // Join them with a comma
  }

  getFirstTwoLanguagesLevel(candidateLanguages: any[]): string {
    if (
      !Array.isArray(candidateLanguages) ||
      candidateLanguages?.length === 0
    ) {
      return '';
    }

    return candidateLanguages
      .slice(0, 2) // Take only the first two elements
      .map((lang) => lang?.level) // Extract language names
      .join(', '); // Join them with a comma
  }
}
