import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';
import { routes } from 'src/app/core/helpers/routes/routes';
import { JobService } from 'src/app/core/services/job.service';
import { LocationService } from 'src/app/core/services/location.service';
import {
  debounceTime,
  of,
  Subscription,
  switchMap,
  distinctUntilChanged,
} from 'rxjs';
import { ContractService } from 'src/app/core/services/contract.service';
import { ProjectService } from 'src/app/core/services/project.service';
import { SkillService } from 'src/app/core/services/skill.service';
import { LanguageService } from 'src/app/core/services/language.service';
import { minDateValidator } from 'src/app/core/services/common/common-functions';
interface data {
  value: string;
}

interface Language {
  id: string;
  name: string;
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
  public globalErrorMessage: boolean | null = false;
  public language: number[] = [];

  editor: Editor = new Editor();
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['horizontal_rule', 'format_clear', 'indent', 'outdent'],
    ['superscript', 'subscript'],
    ['undo', 'redo'],
  ];

  jobForm: FormGroup;
  filteredCities: any[] = [];
  filteredLanguages: Language[] = [];
  dbLanguages: any[] = [];
  cityInputSub: Subscription | undefined;
  jobs: any[] = [];
  subActivities: any[] = [];
  savedSkills: any[] = [];
  filteredSkills: any[] = [];
  filteredJobs: any[] = [];
  contractTypes: any[] = [];
  isCdiSelected = false;
  jobNotExist = true;
  activeIndex: number = 0;
  cityIsSelected = false;
  selectedSkills: any[] = [];
  languages: any[] = [];
  selectedLanguageList: data[] = [
    { value: 'Basique' },
    { value: 'Professionnel' },
    { value: 'Avancé' },
  ];
  selectedSalaryTypeList: data[] = [
    { value: 'Heure' },
    { value: 'Mensuel' },
    { value: 'Annuel' },
    { value: 'JTM' },
  ];
  minDate: string = '';

  constructor(
    private fb: FormBuilder,
    private locationService: LocationService,
    private jobService: JobService,
    private contractService: ContractService,
    private projectService: ProjectService,
    private skillService: SkillService,
    private languageService: LanguageService,
    private router: Router
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];

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
      duration: [0, [Validators.required, Validators.min(1)]],
      seniority: ['', [Validators.required]],
      timeUnit: [null, [Validators.required]],
      startDate: [null, [Validators.required, minDateValidator(today)]],
      endDate: [null, [Validators.required, minDateValidator(today)]],
      skills: [''],
      salary: [0, [Validators.min(1), Validators.required]],
      typologie: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(30)]],
      languages: this.fb.array([this.createLanguage()]),
      company: [null],
    });
  }
  ngOnInit(): void {
    this.editor = new Editor();
    this.getJobs();
    this.getSubActivities();
    this.getSkills();
    this.getLanguagesFromDb();
    this.getContractTypes();
    this.cityInputSub = this.jobForm
      .get('city')
      ?.valueChanges.pipe(
        debounceTime(150), // Wait 300ms for user to stop typing
        distinctUntilChanged(),
        switchMap((query) =>
          query ? this.locationService.searchCities(query) : of([])
        )
      )
      .subscribe((cities) => {
        if (!this.cityIsSelected) this.filteredCities = cities;
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
  get seniority() {
    return this.jobForm.get('seniority');
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
  get salary() {
    return this.jobForm.get('salary');
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

  get languagesArray(): FormArray {
    return this.jobForm.get('languages') as FormArray;
  }

  initForm() {
    this.jobForm = this.fb.group({
      languages: this.fb.array([this.createLanguage()]),
    });
  }

  getLanguagesFromDb() {
    this.languageService.getLanguages().subscribe({
      next: (res) => {
        this.dbLanguages = res;
      },
      error: (err) => {},
    });
  }

  // Create a new language form group
  createLanguage(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      level: ['', Validators.required],
    });
  }

  // Add a new language to the array
  addLanguage(): void {
    this.languagesArray.push(this.createLanguage());
  }

  // Remove a language from the array
  removeLanguage(index: number): void {
    if (this.languagesArray.length > 1) {
      this.languagesArray.removeAt(index);
    }
  }

  selectCity(city: any): void {
    this.filteredCities = [];
    this.cityIsSelected = true;
    this.jobForm.patchValue({
      city: city.name,
      department: city.department?.name || '',
      region: city.department?.region?.name || '',
    });
  }

  filterLanguages(e: any, i: number) {
    this.activeIndex = i;
    let query = e.value;
    if (!query) {
      this.filteredLanguages = this.dbLanguages;
    } else {
      this.filteredLanguages = this.dbLanguages.filter((lang) =>
        lang.name.toLowerCase().includes(query.toLowerCase())
      );
    }
  }

  selectLanguage(lang: any, index: number) {
    const languagesArray = this.jobForm.get('languages') as FormArray;
    const languageForm = languagesArray.at(index) as FormGroup;

    if (languageForm) {
      languageForm.patchValue({ name: lang.name });
    }

    this.filteredLanguages = [];
  }
  getJobs() {
    this.jobService.getJobs().subscribe({
      next: (data) => {
        this.jobs = data;
      },
      error: (error) => {
        console.error(error);
        this.globalErrorMessage = true;
      },
    });
  }

  filterJobs(e: any) {
    let query = e.value;
    if (!query) {
      this.filteredJobs = this.jobs;
      this.jobNotExist = false;
    } else {
      this.filteredJobs = this.jobs.filter((job) =>
        job.name.toLowerCase().includes(query.toLowerCase())
      );
      this.jobNotExist = this.filteredJobs.length === 0;
    }
  }

  selectJob(job: any): void {
    this.filteredJobs = [];
    this.jobNotExist = false;
    this.jobForm.patchValue({
      job: job?.name || '',
      subActivity: job?.subActivity?.name || '',
      activity: job?.subActivity?.activity?.name || '',
    });
  }

  addJob(): void {
    const jobName = this.jobForm.get('job')?.value?.trim(); // Get and trim the job name
    if (!jobName) {
      return; // Do nothing if the job name is empty
    }

    // Check if the job already exists in the filtered list
    const existingJob = this.filteredJobs.find(
      (job) => job.name.toLowerCase() === jobName.toLowerCase()
    );

    if (existingJob) {
      // Job already exists, no need to add
      return;
    }

    this.filteredJobs.push({ name: jobName });

    this.jobForm.patchValue({
      job: jobName,
    });
    this.filteredJobs = [];
    this.jobNotExist = true;
  }

  getSubActivities() {
    this.jobService.getSubActivities().subscribe({
      next: (data) => {
        this.subActivities = data;
      },
      error: (error) => {
        console.error(error);
        this.globalErrorMessage = true;
      },
    });
  }

  getSkills() {
    this.skillService.getSkills().subscribe({
      next: (data) => {
        this.savedSkills = data;
      },
      error: (error) => {
        console.error(error);
        this.globalErrorMessage = true;
      },
    });
  }

  filterSkills(e: any) {
    let query = e.value;
    if (!query) {
      this.filteredSkills = this.savedSkills;
    } else {
      this.filteredSkills = this.savedSkills.filter((skill) =>
        skill.name.toLowerCase().includes(query.toLowerCase())
      );
    }
  }

  selectSkill(skill: any) {
    if (!this.selectedSkills.some((s) => s.id === skill.id)) {
      this.selectedSkills.push(skill);
      this.jobForm.get('skills')?.setValue('');
    }
    this.filteredSkills = [];
  }

  addSkill(event: any): void {
    event.preventDefault(); // Prevent default form submission behavior

    const skillName = this.jobForm.get('skills')?.value?.trim(); // Get and trim the skill name
    if (!skillName) {
      return; // Do nothing if the skill name is empty
    }

    // Check if the skill exists in the filteredSkills array
    const existingSkillInFiltered = this.filteredSkills.find(
      (skill) => skill.name.toLowerCase() === skillName.toLowerCase()
    );

    // Check if the skill already exists in the selectedSkills array
    const existingSkillInSelected = this.selectedSkills.find(
      (skill) => skill.name.toLowerCase() === skillName.toLowerCase()
    );

    if (existingSkillInFiltered) {
      // If the skill exists in filteredSkills, add it to selectedSkills (if not already added)
      if (!existingSkillInSelected) {
        this.selectedSkills.push(existingSkillInFiltered);
      }
    } else {
      // If the skill does not exist in filteredSkills, add it as a new skill to selectedSkills
      if (!existingSkillInSelected) {
        this.selectedSkills.push({ name: skillName });
      }
    }

    // Reset the input field
    this.jobForm.patchValue({
      skills: '',
    });
    this.filteredSkills = [];
  }

  removeSkill(skill: any) {
    this.selectedSkills = this.selectedSkills.filter((s) => s.id !== skill.id);
  }

  getContractTypes() {
    this.contractService.getContractTypes().subscribe({
      next: (data) => {
        this.contractTypes = data;
      },
      error: (error) => {
        console.error(error);
        this.globalErrorMessage = true;
      },
    });
  }

  previous: string | null = null;
  onSubActivityChange(event: any) {
    const subActivitySName = event.target.value;
    if (subActivitySName && subActivitySName !== this.previous) {
      this.previous = subActivitySName;
      this.jobService
        .getSubActivitiesDetails(subActivitySName)
        .subscribe((data) => {
          this.jobForm.patchValue({
            activity: data?.activity?.name || '',
          });
        });
    }
  }

  onContractTypeChange(event: any) {
    const typeId = event.target.value;
    if (typeId && typeId !== this.previous) {
      this.previous = typeId;
      this.contractService.getTypeDetails(typeId).subscribe((data) => {
        if (data.description === 'CDI') {
          this.isCdiSelected = true;
          this.removeValidation();
        } else {
          this.isCdiSelected = false;
          this.setValidation();
        }
      });
    }
  }

  onSubmit() {
    this.markFormGroupTouched(this.jobForm);
    this.globalErrorMessage = false; // Reset the error message before each submission

    if (this.jobForm.valid) {
      this.jobForm.get('skills')?.setValue(this.selectedSkills);
      this.projectService.createProject(this.jobForm.value).subscribe({
        next: (response) => {
          this.router.navigate([routes.getProjectConfirmation(response.id)]);
        },
        error: (error) => {
          console.error('Error creating project:', error);
          this.globalErrorMessage = true;
        },
      });
    } else {
      console.error('Form is invalid');
    }
  }

  setValidation() {
    this.jobForm.get('endDate')?.setValidators([Validators.required]);
    this.jobForm.get('duration')?.setValidators([Validators.required]);
    this.jobForm.get('timeUnit')?.setValidators([Validators.required]);
    this.jobForm.get('endDate')?.updateValueAndValidity();
    this.jobForm.get('duration')?.updateValueAndValidity();
    this.jobForm.get('timeUnit')?.updateValueAndValidity();
  }

  removeValidation() {
    this.jobForm.get('endDate')?.clearValidators();
    this.jobForm.get('duration')?.clearValidators();
    this.jobForm.get('timeUnit')?.clearValidators();
    this.jobForm.get('endDate')?.updateValueAndValidity();
    this.jobForm.get('duration')?.updateValueAndValidity();
    this.jobForm.get('timeUnit')?.updateValueAndValidity();
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if ((control as FormGroup).controls) {
        this.markFormGroupTouched(control as FormGroup); // Recursive for nested form groups
      }
    });
  }

  onFormKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  // showErrorModal(): void {
  //   const modalElement = document.getElementById('post-error') as HTMLElement;
  //   if (modalElement) {
  //     const modal = new Bootstrap.Modal(modalElement); // Correctly reference Bootstrap.Modal
  //     modal.show();
  //   }
  // }
}
