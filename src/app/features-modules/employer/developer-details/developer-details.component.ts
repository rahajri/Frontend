import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { routes } from 'src/app/core/helpers/routes/routes';
import { CandidateService } from 'src/app/core/services/condidate.service';
import { environment } from 'src/environments/environment';
import { UserService } from '../../auth/service/user.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-developer-details',
  templateUrl: './developer-details.component.html',
  styleUrls: ['./developer-details.component.scss'],
})
export class DeveloperDetailsComponent implements OnInit, OnDestroy {
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

  constructor(
    private router: Router,
    private readonly candidateService: CandidateService,
    private readonly userService: UserService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.candidateId = this.route.snapshot.paramMap.get('id');
    this.editor = new Editor();
    if (this.candidateId) {
      this.getCandidateInfo(this.candidateId);
    }
    this.loadMap();
  }

  getCandidateInfo(id: string) {
    this.candidateService.getCandidateById(id).subscribe({
      next: (res) => {
        this.candidate = res;
        console.log(res);
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

  addDetails(array: number[]) {
    array.push(1);
  }

  deleteDetails(array: number[], index: number) {
    this.details.splice(index, 1);
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

  downloadPdf() {
    window.print();
  }
}
