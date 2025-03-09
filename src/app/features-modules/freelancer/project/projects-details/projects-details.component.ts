import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, Editor, Toolbar } from 'ngx-editor';
import { FormControl, FormGroup } from '@angular/forms';
import { routes } from 'src/app/core/helpers/routes/routes';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/core/services/project.service';
import { CommonService } from 'src/app/core/services/common/common.service';
import { environment } from 'src/environments/environment';
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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private commonService: CommonService
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
    this.router.navigate([routes.freelancer_projects_proposals]);
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
}
