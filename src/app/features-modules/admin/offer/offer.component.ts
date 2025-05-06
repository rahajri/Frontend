import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
import {
  showSuccessModal,
  minDateValidator,
  markFormGroupTouched,
} from 'src/app/core/services/common/common-functions';
import { StatusService } from 'src/app/core/services/status.service';
import { IaService } from 'src/app/core/services/ia.service';
interface data {
  value: string;
}

interface Language {
  id: string;
  name: string;
}

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
})
export class OfferComponent {
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

  offerId: string | null = '';
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
  showAdminHeader: boolean = false;
  jobNotExist = true;
  activeIndex: number = 0;
  cityIsSelected = false;
  selectedSkills: any[] = [];
  languages: any[] = [];
  initialFormValues: any;
  projectsStatus: any[] = [];
  selectedLanguageList: data[] = [
    { value: 'Basique' },
    { value: 'Professionnel' },
    { value: 'Avancé' },
  ];
  selectedSalaryTypeList: data[] = [
    { value: 'Heure' },
    { value: 'Mensuel' },
    { value: 'Annuel' },
    { value: 'TJM/Jour' },
  ];
  minDate: string = '';
  private isPatching = false;

  constructor(
    private fb: FormBuilder,
    private locationService: LocationService,
    private jobService: JobService,
    private contractService: ContractService,
    private projectService: ProjectService,
    private skillService: SkillService,
    private languageService: LanguageService,
    private statusService: StatusService,
    private iaService: IaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];

    this.jobForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      activity: ['', [Validators.required]],
      subActivity: ['', [Validators.required]],
      job: ['', [Validators.required]],
      city: ['', [Validators.required]],
      department: ['', [Validators.required]],
      region: ['', [Validators.required]],
      seniority: ['', [Validators.required]],
      contractType: ['', [Validators.required]],
      duration: [0, [Validators.required, Validators.min(1)]],
      timeUnit: [null, [Validators.required]],
      startDate: [null, [Validators.required, minDateValidator(today)]],
      endDate: [null, [Validators.required, minDateValidator(today)]],
      skills: [[], Validators.required],
      status: [''],
      salary: [0, [Validators.required, Validators.min(1)]],
      typologie: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(200)]],
      languages: this.fb.array([this.createLanguage()]),
      company: [null],
    });
  }
  ngOnInit(): void {
    this.showAdminHeader = this.showHeader();
    this.offerId = this.route.snapshot.paramMap.get('id');
    this.editor = new Editor();
    this.getAllOfferStatus();
    this.getOfferDetails();
    this.getJobs();
    this.getSubActivities();
    this.getSkills();
    this.getLanguagesFromDb();
    this.getContractTypes();
    this.cityInputSub = this.jobForm
      .get('city')
      ?.valueChanges.pipe(
        debounceTime(200), // Wait 300ms for user to stop typing
        distinctUntilChanged(),
        switchMap((query) => {
          if (this.isPatching) {
            // Skip search if patching is in progress
            return of([]);
          }
          return query ? this.locationService.searchCities(query) : of([]);
        })
      )
      .subscribe((cities) => {
        if (!this.cityIsSelected) this.filteredCities = cities;
        if (cities && this.filteredCities.length === 1) {
          // Automatically select the first city if there's only one match
          this.autoSelectCity(this.filteredCities[0]);
        } else {
          this.cityIsSelected = false; // Reset the selection flag
        }
      });
  }

  getOfferDetails() {
    this.projectService.getProjectDetails(this.offerId).subscribe({
      next: (res) => {
        this.initialFormValues = {
          title: res?.title || '',
          description: res?.description || '',
          endDate: res?.endDate,
          seniority: res?.seniority || '',
          contractType: res?.contractType?.id || '',
          startDate: res?.startDate,
          duration: res?.expectedDuration || 0,
          timeUnit: res?.timeUnit || '',
          typologie: res?.salaryType?.type || '',
          salary: res?.salaryType?.salary || '',
          job: res?.job?.name || '',
          status: res?.status?.name || '',
          activity: res?.job?.subActivity?.activity?.name || '',
          subActivity: res?.job?.subActivity?.name || '',
          city: res?.city?.name || '',
          company: res?.company?.name || '',
        };

        this.isPatching = true;

        // Patch the main form values
        this.jobForm.patchValue(this.initialFormValues);

        this.isPatching = false;
        this.filteredCities = [res?.city]; // Assuming res.city is the full city object
        this.cityIsSelected = true;

        // Trigger onContractTypeChange after patching contractType
        if (this.initialFormValues.contractType) {
          this.onContractTypeChange({
            target: { value: this.initialFormValues.contractType },
          });
        }

        //Patch the languages FormArray
        if (res.jobOfferLanguages && res.jobOfferLanguages.length > 0) {
          this.languagesArray.clear(); // Clear existing controls
          res.jobOfferLanguages.forEach((lang: any) => {
            this.languagesArray.push(
              this.createLanguage({
                name: lang.language.name, // Use the nested language name
                level: lang.level, // Use the level from jobOfferLanguages
              })
            );
          });
        } else {
          this.languagesArray.clear(); // Clear the array if no languages are provided
        }

        this.selectedSkills = res.skills;
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

  getAllOfferStatus() {
    this.statusService.getProjectsStatus().subscribe({
      next: (res) => {
        this.projectsStatus = res;
      },
      error: (err) => {},
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

  showHeader(): boolean {
    const role = localStorage.getItem('role');
    return role === 'admin' ? true : false;
  }

  // Create a new language form group
  createLanguage(lang?: { name: string; level: string }): FormGroup {
    return this.fb.group({
      name: [lang ? lang.name : '', Validators.required],
      level: [lang ? lang.level : '', Validators.required],
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
    markFormGroupTouched(this.jobForm);
    this.globalErrorMessage = false;
    this.updateSkillsValidation();
    const generateEmb =
      this.jobForm.value.status === 'Published' ? true : false;

    if (this.jobForm.valid) {
      this.projectService
        .updateProject(this.offerId, {
          ...this.jobForm.value,
          skills: this.selectedSkills,
        })
        .subscribe({
          next: (response) => {
            if (generateEmb) {
              this.iaService.generateOfferEmb(response.id);
            }

            showSuccessModal('data-changed');
            this.getOfferDetails();
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
    const today = new Date(); // Get the current date
    this.jobForm.get('endDate')?.setValidators([
      Validators.required,
      minDateValidator(today), // Add minDateValidator
    ]);
    this.jobForm.get('duration')?.setValidators([Validators.required]);
    this.jobForm.get('timeUnit')?.setValidators([Validators.required]);

    // Update the validity of the controls
    this.jobForm.get('endDate')?.updateValueAndValidity();
    this.jobForm.get('duration')?.updateValueAndValidity();
    this.jobForm.get('timeUnit')?.updateValueAndValidity();
  }

  removeValidation() {
    this.jobForm.get('endDate')?.clearValidators();
    this.jobForm.get('endDate')?.updateValueAndValidity();
    this.jobForm.get('duration')?.clearValidators();
    this.jobForm.get('duration')?.updateValueAndValidity();
    this.jobForm.get('timeUnit')?.clearValidators();
    this.jobForm.get('timeUnit')?.updateValueAndValidity();

    // Set duration, timeUnit, and endDate to null
    this.jobForm.patchValue({
      duration: 0,
      timeUnit: null,
      endDate: null,
    });
  }
  onFormKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  autoSelectCity(city: any): void {
    // Clear the filtered cities list
    this.filteredCities = [];

    // Mark the city as selected
    this.cityIsSelected = true;

    // Patch the form values
    this.jobForm.patchValue({
      city: city.name,
      department: city.department?.name || '', // Handle null/undefined department
      region: city.department?.region?.name || '', // Handle null/undefined region
    });
  }

  translateStatusToFrench(status: string): string {
    const statusTranslations: { [key: string]: string } = {
      Draft: 'Brouillon',
      Published: 'Publiée',
      Closed: 'Fermée',
    };

    return statusTranslations[status] || status; // Return the translated status or the original status if not found
  }

  updateSkillsValidation() {
    const skillsControl = this.jobForm.get('skills');

    if (this.selectedSkills.length > 0) {
      // Remove the required validator if selectedSkills is not empty
      skillsControl?.clearValidators(); // Clear all validators
    } else {
      // Add the required validator if selectedSkills is empty
      skillsControl?.setValidators([Validators.required]);
    }

    // Update the control's validity state
    skillsControl?.updateValueAndValidity();
  }
}
