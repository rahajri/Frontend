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
import { SkillService } from 'src/app/core/services/skill.service';
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

  jobs: any[] = [];
  subActivities: any[] = [];
  // savedSkills: any[] = [];
  savedSkills: any[] = [
    { id: '1', name: 'JavaScript', level: 'Expert' },
    { id: '2', name: 'Python', level: 'Advanced' },
    { id: '3', name: 'Java', level: 'Intermediate' },
    { id: '4', name: 'C#', level: 'Beginner' },
    { id: '5', name: 'HTML', level: 'Expert' },
    { id: '6', name: 'CSS', level: 'Advanced' },
    { id: '7', name: 'Angular', level: 'Intermediate' },
    { id: '8', name: 'React', level: 'Advanced' },
    { id: '9', name: 'Node.js', level: 'Advanced' },
    { id: '10', name: 'SQL', level: 'Intermediate' },
    { id: '11', name: 'MongoDB', level: 'Intermediate' },
    { id: '12', name: 'TypeScript', level: 'Advanced' },
    { id: '13', name: 'PHP', level: 'Beginner' },
    { id: '14', name: 'Ruby', level: 'Beginner' },
    { id: '15', name: 'Kotlin', level: 'Intermediate' },
    { id: '16', name: 'Swift', level: 'Intermediate' },
    { id: '17', name: 'Go', level: 'Beginner' },
    { id: '18', name: 'C++', level: 'Advanced' },
    { id: '19', name: 'Scala', level: 'Beginner' },
    { id: '20', name: 'Rust', level: 'Intermediate' },
  ];
  filteredSkills: any[] = [];
  contractTypes: any[] = [];
  isCdiSelected = false;
  cityIsCdiSelected = false;
  selectedSkills: any[] = [];

  constructor(
    private fb: FormBuilder,
    private locationService: LocationService,
    private jobService: JobService,
    private contractService: ContractService,
    private projectService: ProjectService,
    private skillService: SkillService,
    private router: Router
  ) {
    this.jobForm = this.fb.group({
      title: [
        '',
        [
          Validators.required, // Validation obligatoire
          Validators.minLength(5), // Minimum de 30 caractères
        ],
      ],
      activity: ['', [Validators.required]],
      subActivity: ['', [Validators.required]],
      job: ['', [Validators.required]],
      city: ['', [Validators.required]],
      department: ['', [Validators.required]],
      region: ['', [Validators.required]],
      contractType: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      timeUnit: ['', [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      skills: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(30)]],
    });
  }
  ngOnInit(): void {
    this.editor = new Editor();
    this.getJobs();
    this.getSubActivities();
    this.getSkills();
    this.getContractTypes();
    this.cityInputSub = this.jobForm
      .get('city')
      ?.valueChanges.pipe(
        debounceTime(100), // Wait 300ms for user to stop typing
        switchMap((query) =>
          query ? this.locationService.searchCities(query) : of([])
        )
      )
      .subscribe((cities) => {
        if (!this.cityIsCdiSelected) this.filteredCities = cities;
      });
  }
  ngOnDestroy(): void {
    if (this.editor) {
      this.editor.destroy();
    }
  }

  get title() {
    return this.jobForm.get('title');
  }
  get activity() {
    return this.jobForm.get('activity');
  }
  get subActivity() {
    return this.jobForm.get('subActivity');
  }
  get job() {
    return this.jobForm.get('job');
  }
  get city() {
    return this.jobForm.get('city');
  }
  get department() {
    return this.jobForm.get('department');
  }
  get region() {
    return this.jobForm.get('region');
  }
  get contractType() {
    return this.jobForm.get('contractType');
  }
  get duration() {
    return this.jobForm.get('duration');
  }
  get skills() {
    return this.jobForm.get('skills');
  }
  get description() {
    return this.jobForm.get('description');
  }
  get startDate() {
    return this.jobForm.get('startDate');
  }
  get endDate() {
    return this.jobForm.get('endDate');
  }
  get timeUnit() {
    return this.jobForm.get('timeUnit');
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
      this.cityIsCdiSelected = false;
      this.filteredCities = [];
    }
  }

  selectCity(city: any): void {
    this.filteredCities = [];
    this.cityIsCdiSelected = true;
    this.jobForm.patchValue({
      city: city.name,
      department: city.department?.name || '',
      region: city.department?.region?.name || '',
    });
  }

  getJobs() {
    // Fetch the list of jobs (Métier) on component initialization
    this.jobService.getJobs().subscribe((data) => {
      this.jobs = data;
    });
  }

  getSubActivities() {
    this.jobService.getSubActivities().subscribe((data) => {
      this.subActivities = data;
    });
  }

  getSkills() {
    // Fetch the list of jobs (Métier) on component initialization
    // this.skillService.getSkills().subscribe((data) => {
    //   this.savedSkills = data;
    //   console.log('skills: ', data);
    // });
  }

  filterSkills(e: any) {
    let query = e.value;
    console.log(query, this.savedSkills);
    if (!query) {
      // If no query, show all skills
      this.filteredSkills = this.savedSkills;
    } else {
      // Filter the skills array based on the query (case-insensitive search)
      this.filteredSkills = this.savedSkills.filter((skill) =>
        skill.name.toLowerCase().includes(query.toLowerCase())
      );
    }
  }

  getContractTypes() {
    this.contractService.getContractTypes().subscribe((data) => {
      this.contractTypes = data;
    });
  }

  previousId: string | null = null;

  jobSelect(job: any) {
    this.jobForm.patchValue({
      job: job.id,
    });
  }

  onSubActivityChange(event: any) {
    const subActivityId = event.target.value;
    if (subActivityId && subActivityId !== this.previousId) {
      this.previousId = subActivityId;
      this.jobService.getSubActivitiesDetails(subActivityId).subscribe((data) => {
        console.log(data);
        this.jobForm.patchValue({
          activity: data?.activity?.name || '',
        });
      });
    }
  }

  onContractTypeChange(event: any) {
    const typeId = event.target.value;
    if (typeId && typeId !== this.previousId) {
      this.previousId = typeId;
      this.contractService.getTypeDetails(typeId).subscribe((data) => {
        if (data.description === 'CDI (Contrat à Durée Indéterminée)') {
          this.isCdiSelected = true;
          this.jobForm.get('endDate')?.clearValidators();
          this.jobForm.get('endDate')?.setValue(null);
          this.jobForm.get('endDate')?.updateValueAndValidity();
        } else {
          this.isCdiSelected = false;
          this.jobForm.get('endDate')?.setValidators([Validators.required]);
          this.jobForm.get('endDate')?.updateValueAndValidity();
        }
      });
    }
  }
  selectSkill(skill: any) {
    // Add the selected skill if not already added
    if (!this.selectedSkills.some((s) => s.id === skill.id)) {
      this.selectedSkills.push(skill);
      this.jobForm.get('skills')?.setValue('');
    }

    // Clear the input field and suggestions
    this.filteredSkills = [];
  }

  removeSkill(skill: any) {
    // Remove skill from selectedSkills
    this.selectedSkills = this.selectedSkills.filter((s) => s.id !== skill.id);
  }

  onSubmit() {
    // Mark all controls as touched to trigger validation
    this.markFormGroupTouched(this.jobForm);

    if (this.jobForm.valid) {
      console.log(this.jobForm.value);
      // this.projectService.createProject(this.jobForm.value).subscribe(
      //   (response) => {
      //     // this.router.navigate([routes.projectconfirmation])
      //   },
      //   (error) => {
      //     console.error('Error creating project:', error);
      //   }
      // );
    } else {
      console.log('Form is invalid');
    }
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if ((control as FormGroup).controls) {
        this.markFormGroupTouched(control as FormGroup); // Recursive for nested form groups
      }
    });
  }
}
