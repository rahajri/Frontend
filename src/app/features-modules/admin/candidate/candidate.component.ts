import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';
import { showSuccessModal } from 'src/app/core/services/common/common-functions';
import { CandidateService } from 'src/app/core/services/condidate.service';
import { IaService } from 'src/app/core/services/ia.service';
import { JobService } from 'src/app/core/services/job.service';
import { LanguageService } from 'src/app/core/services/language.service';
import { SkillService } from 'src/app/core/services/skill.service';
import { environment } from 'src/environments/environment';

interface Language {
  id: string;
  name: string;
}
interface Skill {
  id: string;
  name: string;
}
@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss'],
})
export class CandidateComponent {
  public routes = routes;
  public skills: number[] = [];
  public education: number[] = [];
  public certification: number[] = [];
  public experience: number[] = [];
  public language: number[] = [];

  public datas: boolean[] = [true];
  public isCheckboxChecked = true;
  baseUrl = environment.apiUrl;
  jobNotExist = true;
  filteredJobs: any[] = [];
  jobs: any[] = [];
  subActivities: any[] = [];

  skillLevels = ['Basique', 'Professionnel', 'Avancé'];
  candidate: any = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    profileTitle: '',
    image: '',
    role: '',
    candidateSkills: {
      level: '',
      skill: {
        name: '',
      },
    },
  };
  candidateId: string | null = '';
  form: FormGroup;
  filteredLanguages: Language[] = [];
  dbLanguages: any[] = [];
  activeIndex: number = 0;
  filteredSkills: Skill[] = [];
  dbSkills: any[] = [];
  index: number = 0;
  imgUrl: string = '';

  removeDatas(index: number) {
    this.datas[index] = !this.datas[index];
  }
  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private languageService: LanguageService,
    private skillService: SkillService,
    private candidateService: CandidateService,
    private iaService: IaService,
    private route: ActivatedRoute,
    private jobService: JobService
  ) {
    this.form = this.fb.group({
      personalDetails: this.fb.group({
        lastName: [''],
        firstName: [''],
        profileTitle: [''],
        phone: [''],
        email: [''],
        image: [null],
      }),

      skills: this.fb.array([this.createSkill()]),
      activities: this.fb.array([this.createActivity()]),

      experiences: this.fb.array([this.createExperience()]),
      education: this.fb.array([this.createEducation()]),
      languages: this.fb.array([this.createLanguage()]),
    });
  }
  ngOnInit(): void {
    this.candidateId = this.route.snapshot.paramMap.get('id');
    this.getJobs();
    this.getSubActivities();
    this.getCondidature();
    this.getLanguagesFromDb();
    this.getSSkillsFromDb();
  }

  onSubmit() {
    // Create a new FormData object
    const formData = new FormData();

    // Get the form values
    const profileData = this.form.value;

    // Append the image file to the FormData object
    const imageFile = this.form.get('personalDetails.image')?.value;
    if (imageFile instanceof File) {
      formData.append('image', imageFile); // Use 'image' as the field name
    }

    // Append other form data to the FormData object
    Object.keys(profileData).forEach((key) => {
      if (key !== 'image') {
        // Skip the image field, as it's already appended
        if (typeof profileData[key] === 'object' && profileData[key] !== null) {
          // If the value is an object (e.g., nested form group), stringify it
          formData.append(key, JSON.stringify(profileData[key]));
        } else {
          // Append other values as strings
          formData.append(key, profileData[key]);
        }
      }
    });

    // Send the FormData to the backend
    this.candidateService
      .updateCandidateProfile(this.candidate?.id, formData)
      .subscribe({
        next: (res) => {
          this.getCondidature();
          this.iaService.generateCandidateEmb(this.candidate.id);
          showSuccessModal('data-changed');
        },
        error: (err) => {
          console.error('Error updating profile:', err);
        },
      });
  }

  formatTime(date: Date) {
    const selectedDate: Date = new Date(date);
    return this.datePipe.transform(selectedDate, 'h:mm a');
  }

  getCondidature(): void {
    if (!this.candidateId) {
      return;
    }

    this.candidateService.getCandidateById(this.candidateId).subscribe({
      next: (response) => {
        this.patchFormData(response);
        this.candidate = response;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      var reader = new FileReader();
      const file = input.files[0];
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.imgUrl = e.target.result;
      };
      // Update the form control with the file
      this.form.get('personalDetails.image')?.patchValue(file);
      this.form.get('personalDetails.image')?.updateValueAndValidity();
    }
  }
  getSSkillsFromDb() {
    this.skillService.getSkills().subscribe({
      next: (res) => {
        this.dbSkills = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  filterSkills(e: any, i: number) {
    this.index = i;
    let query = e.value;
    if (!query) {
      this.filteredSkills = this.dbSkills;
    } else {
      this.filteredSkills = this.dbSkills.filter((skill) =>
        skill.name.toLowerCase().includes(query.toLowerCase())
      );
    }
  }

  selectSkill(skill: any, index: number) {
    const skillsArray = this.form.get('skills') as FormArray;
    const skillForm = skillsArray.at(index) as FormGroup;

    if (skillForm) {
      skillForm.patchValue({ name: skill.name });
    }

    this.filteredSkills = [];
  }

  getLanguagesFromDb() {
    this.languageService.getLanguages().subscribe({
      next: (res) => {
        this.dbLanguages = res;
      },
      error: (err) => {},
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
    const languagesArray = this.form.get('languages') as FormArray;
    const languageForm = languagesArray.at(index) as FormGroup;

    if (languageForm) {
      languageForm.patchValue({ name: lang.name });
    }

    this.filteredLanguages = [];
  }

  createSkill(): FormGroup {
    return this.fb.group({
      skillName: [''], // Default empty value
      level: [''], // Default empty value
    });
  }

  createEducation(): FormGroup {
    return this.fb.group({
      degreeName: [''], // Default value for degree name
      universityName: [''], // Default value for university name
      startDate: [''], // Default value for start date
      endDate: [''], // Default value for end date
    });
  }

  // Create a new experience form group
  createExperience(): FormGroup {
    return this.fb.group({
      companyName: ['', Validators.required],
      postTitle: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  // Create a new language form group
  createLanguage(): FormGroup {
    return this.fb.group({
      name: [''],
      level: [''],
    });
  }

  addSkillManually() {
    const skillsArray = this.form.get('skills') as FormArray;
    skillsArray.push(this.createSkill()); // Adds a new skill with skillName and level
  }

  get languagesArray(): FormArray {
    return this.form.get('languages') as FormArray;
  }

  // Getter for accessing the skills form array
  get skillsArray(): FormArray {
    return this.form.get('skills') as FormArray;
  }

  // Example of accessing controls in the template
  removeSkills(index: number) {
    this.skillsArray.removeAt(index); // Use removeAt method to remove from FormArray
  }

  patchFormData(response: any) {
    // Patch personal details
    this.form.get('personalDetails')?.patchValue({
      lastName: response?.lastName || '',
      firstName: response?.firstName || '',
      profileTitle: response?.profileTitle || '',
      phone: response?.phone || '',
      email: response?.email || '',
    });
    this.imgUrl = this.baseUrl + response.image;

    // Patch skills
    const skills: any[] = response['candidateSkills'] || [];
    this.skillsArray.clear();

    if (skills.length > 0) {
      skills.forEach((skill: any) => {
        this.skillsArray.push(
          this.fb.group({
            skillName: [skill?.skill?.name || ''], // Add skill name to form control
            level: [skill?.level || ''], // Add level if available
          })
        );
      });
    } else {
      // If no skills, add one empty skill group
      this.addSkillManually();
    }

    // Patch languages
    const languages: any[] = response['candidateLanguages'] || [];
    this.languagesArray.clear();

    if (languages.length > 0) {
      languages.forEach((lang: any) => {
        this.languagesArray.push(
          this.fb.group({
            name: [lang?.language?.name || ''], // Add language name to form control
            level: [lang?.level || ''], // Add level if available
          })
        );
      });
    } else {
      // If no language data, add one empty language group
      this.addLanguage();
    }

    // Patch education (formations)
    const educationData = response['formations'] || [];
    this.educationArray.clear();
    if (educationData.length > 0) {
      educationData.forEach((education: any) => {
        this.educationArray.push(
          this.fb.group({
            degreeName: [
              education['title'] ||
                education['Certification'] ||
                education['Formation'] ||
                education['nom'] ||
                '',
            ],
            universityName: [
              education['institution'] || education['Délivrée par'] || '',
            ],
            startDate: education['startDate'] || '',
            endDate: education['endDate'] || '',
            description: [education['description'] || ''],
          })
        );
      });
    } else {
      // If no education data, add one empty education group
      this.addEducation();
    }

    // Patch experiences
    const experienceData = response['experiences'] || [];
    this.experiencesArray.clear();
    if (experienceData.length > 0) {
      experienceData.forEach((experience: any) => {
        this.experiencesArray.push(
          this.fb.group({
            companyName: [experience['companyName'] || ''],
            postTitle: [experience['postTitle'] || ''],
            startDate: experience['startDate'] || '',
            endDate: experience['endDate'] || '',
            description: [experience['description'] || ''],
          })
        );
      });
    } else {
      // If no experience data, add one empty experience group
      this.addExperience();
    }

    // ✅ Patch uniquement le premier élément (index 0) de `jobs`
    const firstActivity = response['jobs']?.[0] || null;

    if (firstActivity) {
      this.jobNotExist = false;
      this.form.get('activities')?.setValue([
        {
          job: firstActivity?.name || '',
          sousActivite: firstActivity?.subActivity?.name || '',
          activite: firstActivity?.subActivity?.activity?.name || '',
        },
      ]);
    }
  }

  // Add a new experience to the array
  addExperience(): void {
    this.experiencesArray.push(this.createExperience());
  }

  // Remove an experience from the array
  removeExperience(index: number): void {
    if (this.experiencesArray.length > 1) {
      this.experiencesArray.removeAt(index);
    }
  }
  get experiencesArray(): FormArray {
    return this.form.get('experiences') as FormArray;
  }

  get educationArray(): FormArray {
    return this.form.get('education') as FormArray;
  }
  get languageArray(): FormArray {
    return this.form.get('languages') as FormArray;
  }

  get activities(): FormArray {
    return this.form.get('activities') as FormArray;
  }

  addEducation() {
    const educationArray = this.form.get('education') as FormArray;
    educationArray.push(this.createEducation());
  }

  removeEducation(i: number) {
    const educationArray = this.form.get('education') as FormArray;
    educationArray.removeAt(i);
  }

  addSkills() {
    this.skills.push(1);
  }

  addCertification() {
    this.certification.push(1);
  }
  removeCertification(index: number) {
    this.certification.splice(index, 1);
  }

  createActivity(): FormGroup {
    return this.fb.group({
      job: [''],
      sousActivite: [''],
      activite: [''],
    });
  }

  addActivity() {
    this.activities.insert(0, this.createActivity());
  }

  removeActivity(index: number) {
    this.activities.removeAt(index);
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

  getJobs() {
    // Fetch the list of jobs (Métier) on component initialization
    this.jobService.getJobs().subscribe((data) => {
      this.jobs = data;
    });
  }

  getSubActivities() {
    this.jobService.getSubActivities().subscribe({
      next: (data) => {
        this.subActivities = data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  filterJobs(e: any): void {
    const query = e.value?.trim(); // Trim whitespace from the query
    if (!query) {
      this.filteredJobs = [...this.jobs];
      this.jobNotExist = false;
    } else {
      this.filteredJobs = this.jobs.filter((job) =>
        job.name.toLowerCase().includes(query.toLowerCase())
      );
      this.jobNotExist = this.filteredJobs.length === 0;
    }
  }

  addJob(): void {
    const jobName = this.form.get('job')?.value?.trim(); // Get and trim the job name
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

    // Add the new job to the filtered list
    this.filteredJobs.push({ name: jobName });

    // Update the activities form array
    const activitiesArray = this.form.get('activities') as FormArray;
    if (activitiesArray.length === 0) {
      // If no activities exist, add one
      activitiesArray.push(this.createActivity());
    }

    // Update the first activity with the new job
    const firstActivityGroup = activitiesArray.at(0) as FormGroup;
    firstActivityGroup.patchValue({
      job: jobName,
      sousActivite: '',
      activite: '',
    });

    // Reset temporary fields
    this.filteredJobs = [];
    this.jobNotExist = true;
  }
  selectJob(job: any): void {
    // Clear the filteredJobs array and reset jobNotExist flag
    this.filteredJobs = [];
    this.jobNotExist = false;

    // Update the first activity in the activities form array with the selected job's details
    const activitiesArray = this.form.get('activities') as FormArray;

    if (activitiesArray.length > 0) {
      const firstActivityGroup = activitiesArray.at(0) as FormGroup;
      firstActivityGroup.patchValue({
        job: job?.name || '',
        sousActivite: job?.subActivity?.name || '',
        activite: job?.subActivity?.activity?.name || '',
      });
    }
  }

  previous: string | null = null;

  onSubActivityChange(event: any, index: number): void {
    const subActivityName = event.target.value?.trim(); // Trim whitespace for consistency

    // Check if the new sub-activity is different from the previous one
    if (subActivityName && subActivityName !== this.previous) {
      this.previous = subActivityName; // Update the previous value

      // Fetch details for the new sub-activity
      this.jobService.getSubActivitiesDetails(subActivityName).subscribe({
        next: (data) => {
          // Access the specific activity form group by index
          const activitiesArray = this.form.get('activities') as FormArray;
          const activityGroup = activitiesArray.at(index) as FormGroup;

          // Patch the activite field in the selected activity group
          activityGroup.patchValue({
            activite: data?.activity?.name || '',
          });
        },
        error: (error) => {
          console.error('Error fetching sub-activity details:', error);
        },
      });
    }
  }
}
