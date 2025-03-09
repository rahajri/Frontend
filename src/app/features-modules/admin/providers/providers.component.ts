import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { adminProviders, Offer } from 'src/app/core/models/models';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/core/services/common/common.service';
import { ProjectService } from 'src/app/core/services/project.service';
import { MatPaginator } from '@angular/material/paginator';
import {
  debounceTime,
  distinctUntilChanged,
  of,
  Subscription,
  switchMap,
} from 'rxjs';
import { JobService } from 'src/app/core/services/job.service';
import { SkillService } from 'src/app/core/services/skill.service';
import { ContractService } from 'src/app/core/services/contract.service';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/core/services/language.service';
import { LocationService } from 'src/app/core/services/location.service';
import { Editor, Toolbar } from 'ngx-editor';
import { CompanyService } from 'src/app/core/services/company.service';
import {
  companyExistsValidator,
  exportToCsv,
  minDateValidator,
  markFormGroupTouched,
} from 'src/app/core/services/common/common-functions';

declare var bootstrap: any;
interface data {
  value: string;
}
interface Language {
  id: string;
  name: string;
}
@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss'],
})
export class ProvidersComponent implements OnInit {
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
  dataSource: MatTableDataSource<Offer>;
  displayedColumns: string[] = [
    'createdAt',
    'title',
    'seniority',
    'companyName',
    'city',
    'ContactType',
    'startDate',
    'endDate',
    'action',
  ];
  public routes = routes;
  filter: boolean = false;
  selectedStatus: string | null = null;
  filterForm!: FormGroup;
  addOfferForm!: FormGroup;
  offerToDelete: any;
  selectedHederTitle = 'Tous les projets';
  offersCounter: number = 0;
  inactiveOffersCounter: number = 0;
  draftOffersCounter: number = 0;
  activeOffersCounter: number = 0;
  deletedOffersCounter: number = 0;
  counter: number = 0;
  filteredOffers: any[] = [];
  offersData: any[] = [];
  minDate: string = '';

  //create Offer
  public globalErrorMessage: boolean | null = false;
  filteredCities: any[] = [];
  filteredLanguages: Language[] = [];
  dbLanguages: any[] = [];
  cityInputSub: Subscription | undefined;
  jobs: any[] = [];
  subActivities: any[] = [];
  savedSkills: any[] = [];
  filteredSkills: any[] = [];
  filteredJobs: any[] = [];
  filteredCompanies: any[] = [];
  contractTypes: any[] = [];
  isCdiSelected = false;
  jobNotExist = true;
  activeIndex: number = 0;
  cityIsSelected = false;
  selectedSkills: any[] = [];
  languages: any[] = [];
  companies: any = [];
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

  constructor(
    private data: ShareDataService,
    private fb: FormBuilder,
    private commonService: CommonService,
    private jobService: JobService,
    private skillService: SkillService,
    private contractService: ContractService,
    private projectService: ProjectService,
    private offersService: ProjectService,
    private languageService: LanguageService,
    private companyService: CompanyService,
    private locationService: LocationService,
    private router: Router
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];

    this.dataSource = new MatTableDataSource<Offer>([]);
    this.filterForm = this.fb.group({
      companyName: [''],
      contractType: [''],
      title: [''],
      city: [''],
      department: [''],
      region: [''],
    });

    this.addOfferForm = this.fb.group({
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
      skills: [''],
      salary: [0, Validators.min(0)],
      typologie: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(200)]],
      languages: this.fb.array([this.createLanguage()]),
      company: [
        null,
        [
          Validators.required,
          companyExistsValidator(() => this.filteredCompanies),
        ],
      ],
      publish: [false],
    });
  }
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //Filter toggle
  openFilter() {
    this.filter = !this.filter;
  }
  ngOnInit(): void {
    this.editor = new Editor();
    this.getTableData();
    this.getJobs();
    this.getSubActivities();
    this.getSkills();
    this.getLanguagesFromDb();
    this.getContractTypes();
    this.getAllActiveComps();
    this.cityInputSub = this.addOfferForm
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

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private getTableData(): void {
    this.draftOffersCounter = 0;
    this.inactiveOffersCounter = 0;
    this.activeOffersCounter = 0;
    this.counter = 0;
    this.offersService.getAllOffers().subscribe({
      next: (res) => {
        this.offersData = res;
        this.dataSource = new MatTableDataSource(res);
        this.offersCounter = res.length;
        this.counter = res.length;
        this.setCounter(res);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.dataSource.sort = this.sort; // Assign sort after view initialization
        this.dataSource.paginator = this.paginator;
      },
    });
  }

  disableOffer(id: string) {
    this.projectService.disableProject(id).subscribe({
      next: (res) => {
        this.getTableData();
        this.hideModal('delete_offer');
      },
      error: (err) => {},
    });
  }

  searchData(target: any) {
    const filterValue = target.value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getDate(isoDate: string) {
    return this.commonService.formatDate(isoDate);
  }

  filterOffersByStatus(status: string | null): void {
    this.selectedHederTitle = this.getTranslation(status);
    this.selectedStatus = status;
    if (!status) {
      this.filteredOffers = this.offersData;
      this.dataSource.data = this.offersData;
    } else {
      this.filteredOffers = this.offersData.filter(
        (company: any) => company.status?.name === status
      );
      this.dataSource.data = this.filteredOffers;
    }

    this.counter = this.filteredOffers.length;
  }
  setCounter(res: any) {
    res.forEach((offer: any) => {
      switch (offer.status.name) {
        case 'Draft':
          this.draftOffersCounter++;
          break;
        case 'Closed':
          this.inactiveOffersCounter++;
          break;
        case 'Published':
          this.activeOffersCounter++;
          break;
        default:
          break;
      }
    });
  }

  getTranslation(key: string | null): string {
    if (key === null) {
      return 'Tous les projets';
    } else {
      const translations: { [key: string]: string } = {
        Published: 'les projets publiés',
        Closed: 'Les projets fermés',
        Draft: 'Les Brouillon ',
      };
      return translations[key] || key;
    }
  }

  onFilterSubmit() {
    if (this.filterForm.valid) {
      this.filterProjects({
        ...this.filterForm.value,
        status: this.selectedStatus,
      });
    }
  }

  filterProjects(data: any) {
    this.projectService.projectsFiler(data).subscribe({
      next: (response) => {
        this.dataSource.data = response;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onChange() {
    const filterValues = this.filterForm.value;
    const isEmpty = Object.values(filterValues).some((value) => value === '');
    if (isEmpty) {
      this.getTableData();
    }
  }

  showDeleteOfferModal(offer: any) {
    this.offerToDelete = offer;
    const modalElement = document.getElementById('delete_offer');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
      modalElement.focus();
    }
  }

  // add Offer
  initForm() {
    this.addOfferForm = this.fb.group({
      languages: this.fb.array([this.createLanguage()]),
    });
  }

  createLanguage(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      level: ['', Validators.required],
    });
  }

  get title() {
    return this.addOfferForm.get('title');
  }
  get seniority() {
    return this.addOfferForm.get('seniority');
  }
  get activity() {
    return this.addOfferForm.get('activity');
  }
  get subActivity() {
    return this.addOfferForm.get('subActivity');
  }
  get job() {
    return this.addOfferForm.get('job');
  }
  get city() {
    return this.addOfferForm.get('city');
  }
  get salary() {
    return this.addOfferForm.get('salary');
  }
  get department() {
    return this.addOfferForm.get('department');
  }
  get region() {
    return this.addOfferForm.get('region');
  }
  get company() {
    return this.addOfferForm.get('company');
  }
  get contractType() {
    return this.addOfferForm.get('contractType');
  }
  get duration() {
    return this.addOfferForm.get('duration');
  }
  get skills() {
    return this.addOfferForm.get('skills');
  }
  get description() {
    return this.addOfferForm.get('description');
  }
  get startDate() {
    return this.addOfferForm.get('startDate');
  }
  get endDate() {
    return this.addOfferForm.get('endDate');
  }
  get timeUnit() {
    return this.addOfferForm.get('timeUnit');
  }

  get languagesArray(): FormArray {
    return this.addOfferForm.get('languages') as FormArray;
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
    this.addOfferForm.patchValue({
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
    const languagesArray = this.addOfferForm.get('languages') as FormArray;
    const languageForm = languagesArray.at(index) as FormGroup;

    if (languageForm) {
      languageForm.patchValue({ name: lang.name });
    }

    this.filteredLanguages = [];
  }

  getLanguagesFromDb() {
    this.languageService.getLanguages().subscribe({
      next: (res) => {
        this.dbLanguages = res;
      },
      error: (err) => {},
    });
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

  filterCompanies(e: any) {
    let query = e.value;
    if (!query) {
      this.filteredCompanies = this.companies;
    } else {
      this.filteredCompanies = this.companies.filter((company: any) =>
        company.name.toLowerCase().includes(query.toLowerCase())
      );
      this.jobNotExist = this.filteredCompanies.length === 0;
    }
    this.addOfferForm.get('company')?.updateValueAndValidity();
  }

  selectCompany(company: any): void {
    // Set the selected company in the form control
    this.addOfferForm.patchValue({
      company: company?.name,
    });

    // Clear the filteredCompanies array after a short delay
    setTimeout(() => {
      this.filteredCompanies = [];
    }, 200); // Adjust the delay as needed
  }

  selectJob(job: any): void {
    this.filteredJobs = [];
    this.jobNotExist = false;
    this.addOfferForm.patchValue({
      job: job?.name || '',
      subActivity: job?.subActivity?.name || '',
      activity: job?.subActivity?.activity?.name || '',
    });
  }

  addJob(): void {
    const jobName = this.addOfferForm.get('job')?.value?.trim(); // Get and trim the job name
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

    this.addOfferForm.patchValue({
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
      this.addOfferForm.get('skills')?.setValue('');
    }
    this.filteredSkills = [];
  }

  addSkill(event: any): void {
    event.preventDefault(); // Prevent default form submission behavior

    const skillName = this.addOfferForm.get('skills')?.value?.trim(); // Get and trim the skill name
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
    this.addOfferForm.patchValue({
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
          this.addOfferForm.patchValue({
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
    markFormGroupTouched(this.addOfferForm);
    this.globalErrorMessage = false; // Reset the error message before each submission

    if (this.addOfferForm.valid) {
      this.addOfferForm.get('skills')?.setValue(this.selectedSkills);
      this.projectService.createProject(this.addOfferForm.value).subscribe({
        next: (response) => {
          this.getTableData();
          this.hideModal('add-offer');
          this.addOfferForm.reset();
          this.resetCityInput();
          this.resetSkills();
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

  getAllActiveComps() {
    this.companyService.getAllActiveCompanies().subscribe({
      next: (res) => {
        this.companies = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  deleteOffer(offer: any) {
    this.projectService.deleteOffer(offer?.id).subscribe({
      next: (res) => {
        this.hideModal('delete_offer');
        this.getTableData();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  setValidation() {
    this.addOfferForm.get('endDate')?.setValidators([Validators.required]);
    this.addOfferForm.get('duration')?.setValidators([Validators.required]);
    this.addOfferForm.get('timeUnit')?.setValidators([Validators.required]);
    this.addOfferForm.get('endDate')?.updateValueAndValidity();
    this.addOfferForm.get('duration')?.updateValueAndValidity();
    this.addOfferForm.get('timeUnit')?.updateValueAndValidity();
  }

  removeValidation() {
    this.addOfferForm.get('endDate')?.clearValidators();
    this.addOfferForm.get('duration')?.clearValidators();
    this.addOfferForm.get('timeUnit')?.clearValidators();
    this.addOfferForm.get('endDate')?.updateValueAndValidity();
    this.addOfferForm.get('duration')?.updateValueAndValidity();
    this.addOfferForm.get('timeUnit')?.updateValueAndValidity();
  }

  onFormKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
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

  exportDataToCsv() {
    const filename = 'offers_export.csv';
    exportToCsv(filename, this.offersData);
  }

  resetCityInput() {
    this.cityIsSelected = false; // Reset city selection
    this.filteredCities = []; // Clear filtered cities
    this.addOfferForm.get('city')?.setValue(''); // Clear the city input
    this.cityInputSub = this.addOfferForm
      .get('city')
      ?.valueChanges.pipe(
        debounceTime(150),
        distinctUntilChanged(),
        switchMap((query) =>
          query ? this.locationService.searchCities(query) : of([])
        )
      )
      .subscribe((cities) => {
        if (!this.cityIsSelected) this.filteredCities = cities;
      });
  }

  resetSkills() {
    this.selectedSkills = []; // Clear selected skills
    this.filteredSkills = []; // Clear filtered skills
    this.addOfferForm.get('skills')?.setValue(''); // Clear the skills input field
  }
}
