import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';
import { routes } from 'src/app/core/helpers/routes/routes';
import { JobService } from 'src/app/core/services/job.service';
import { LocationService } from 'src/app/core/services/location.service';
import { debounceTime, of, Subscription, switchMap } from 'rxjs';
import { ContractService } from 'src/app/core/services/contract.service';
import { ProjectService } from 'src/app/core/services/project.service';
interface data {
  value: string;
}

@Component({
  selector: 'app-postproject',
  templateUrl: './postproject.component.html',
  styleUrls: ['./postproject.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PostprojectComponent implements OnInit, OnDestroy {
  public routes = routes;
  public isChecked = true;

  selected = 'select';
  selected1 = 'select';
  editor?: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  jobForm: FormGroup;
  filteredCities: any[] = [];
  cityInputSub: Subscription | undefined;

  jobs: any = [];
  contractTypes: any = [];
  departments = ['01', '02', '75'];
  regions = ['Île-de-France', "Provence-Alpes-Côte d'Azur", 'Bretagne'];

  constructor(
    private fb: FormBuilder,
    private locationService: LocationService,
    private jobService: JobService,
    private contractService: ContractService,
    private projectService: ProjectService,
    private router: Router
  ) {
    this.jobForm = this.fb.group({
      title: [
        '',
        [
          Validators.required, // Validation obligatoire
          Validators.minLength(30), // Minimum de 30 caractères
        ],
      ],
      activity: [''],
      subActivity: [''],
      job: [''],
      city: [''],
      department: [''],
      region: [''],
      contractType: ['', Validators.required],
      duration: [''],
      timeUnit: [''],
      startDate: [''],
      skills: [''],
      description: [''],
    });
  }
  ngOnInit(): void {
    this.editor = new Editor();
    this.getJobs();
    this.getContractTypes();
    this.cityInputSub = this.jobForm
      .get('city')
      ?.valueChanges.pipe(
        debounceTime(300), // Wait 300ms for user to stop typing
        switchMap((query) =>
          query ? this.locationService.searchCities(query) : of([])
        )
      )
      .subscribe((cities) => {
        this.filteredCities = cities;
      });
  }
  ngOnDestroy(): void {
    if (this.editor) {
      this.editor.destroy();
    }
  }
  tag = ['Valve profit'];
  public selectedValue1 = '';
  public selectedValue2 = '';
  public selectedValue3 = '';
  public selectedValue4 = '';
  public selectedValue5 = '';
  selectedList1: data[] = [
    { value: 'Select' },
    { value: 'Category' },
    { value: 'Project' },
  ];
  selectedList2: data[] = [
    { value: '1-3 Week' },
    { value: '1 Month' },
    { value: 'Less then a month' },
    { value: 'More then a month' },
  ];
  selectedList3: data[] = [
    { value: 'Select' },
    { value: 'Full Time' },
    { value: 'Part Time' },
    { value: 'Project Based' },
  ];
  selectedList4: data[] = [
    { value: 'Basic' },
    { value: 'Intermediate' },
    { value: 'Professional' },
  ];
  selectedList5: data[] = [
    { value: 'Basic' },
    { value: 'Intermediate' },
    { value: 'Professional' },
  ];

  get title() {
    return this.jobForm.get('title');
  }

  activeRate = 'hourly';
  toggleHourly() {
    this.activeRate = 'hourly';
  }

  toggleFixed() {
    this.activeRate = 'fixed';
  }
  isFilenameVisible: boolean[] = [true, true, true];

  hideFilename(index: number) {
    this.isFilenameVisible[index] = false;
  }

  // Handle city selection change

  onCityInput(event: Event): void {
    // Additional logic if needed, such as cleaning input
    const input = (event.target as HTMLInputElement).value.trim();
    if (!input) {
      this.filteredCities = [];
    }
  }

  selectCity(city: any): void {
    this.jobForm.patchValue({
      city: city.name,
      department: city.department?.name || '',
      region: city.department?.region?.name || '',
    });
    this.filteredCities = [];
  }

  getJobs() {
    // Fetch the list of jobs (Métier) on component initialization
    this.jobService.getJobs().subscribe((data) => {
      this.jobs = data;
      // if (this.jobs.length > 0) {
      //   // Automatically select the first job
      //   this.jobForm.patchValue({ job: this.jobs[0].id });
      // }
    });
  }

  getContractTypes() {
    this.contractService.getContractTypes().subscribe((data) => {
      this.contractTypes = data;
    });
  }

  previousJobId: string | null = null;

  onJobChange(event: any) {
    const jobId = event.target.value;
    if (jobId && jobId !== this.previousJobId) {
      this.previousJobId = jobId;
      this.jobService.getJobDetails(jobId).subscribe((data) => {
        this.jobForm.patchValue({
          subActivity: data?.subActivity?.name || '',
          activity: data?.subActivity?.activity?.name || '',
        });
      });
    }
  }

  onContractTypeChange(event: any) {
    const typeId = event.target.value;
    if (typeId && typeId !== this.previousJobId) {
      this.previousJobId = typeId;
      this.contractService.getTypeDetails(typeId).subscribe((data) => {
        this.jobForm.patchValue({});
      });
    }
  }

  onSubmit() {
    this.projectService.createProject(this.jobForm.value).subscribe(
      (response) => {
        console.log('Project created successfully:', response);
      },
      (error) => {
        console.error('Error creating project:', error);
      }
    );
    //this.router.navigate([routes.projectconfirmation])
  }
}
