import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';
import { routes } from 'src/app/core/helpers/routes/routes';
import { JobService } from 'src/app/core/services/job.service';
import { LocationService } from 'src/app/core/services/location.service';
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
 
  jobs:any =  [];
  departments = ['01', '02', '75'];
  regions = ['Île-de-France', 'Provence-Alpes-Côte d\'Azur', 'Bretagne'];

  constructor(private fb: FormBuilder,
    private locationService: LocationService,
    private jobService: JobService,
    private router: Router) {
    this.jobForm = this.fb.group({
      jobTitle: [''],
      activity: [''],
      subActivity: [''],
      job: [''],
      city: [''],
      department: [''],
      region: [''],
      renewable: [''],
      contractType: [''],
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
  onCityChange(event: Event): void {
    const selectedCityId = (event.target as HTMLSelectElement).value;
    this.locationService.getcityInfo(selectedCityId).subscribe(
      (city) => {
        if (city) {
          this.jobForm.patchValue({
            department: city.department?.name,
            region: city.department?.region?.name
          });
        }
      },
      (error) => {
        console.error('Error fetching city info:', error);
      }
    );
  }

  getJobs() {
    // Fetch the list of jobs (Métier) on component initialization
    this.jobService.getJobs().subscribe(data => {
      this.jobs = data;
    });
  }
  onJobChange(event: any) {
    const jobId = event.target.value;
    if (jobId) {
      // Fetch sous-activités and activités based on the selected job
      this.jobService.getJobDetails(jobId).subscribe(data => {
        this.jobForm.patchValue({
          subActivity: data?.subActivity?.name,
          activity: data?.subActivity?.activity?.name,
        });
      });
    }
  }
  
 
  onSubmit(){
    console.log(this.jobForm.value);
    //this.router.navigate([routes.projectconfirmation])
  }
}
