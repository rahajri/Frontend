import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';
import { CandidateService } from 'src/app/core/services/condidate.service';
import { LanguageService } from 'src/app/core/services/language.service';
import { SkillService } from 'src/app/core/services/skill.service';
interface data {
  value: string;
}
declare var bootstrap: any;
interface Language {
  id: string;
  name: string;
}
interface Skill {
  id: string;
  name: string;
}

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
})
export class ProfileSettingsComponent implements OnInit {
  public routes = routes;
  public selectedValue1 = '';
  public selectedValue2 = '';
  public selectedValue3 = '';
  public selectedValue4 = '';
  public selectedValue5 = '';
  public selectedValue6 = '';
  public selectedValue7 = '';
  public selectedValue8 = '';
  public selectedValue9 = '';
  public customvalue1 = '';

  public skills: number[] = [];
  public education: number[] = [];
  public certification: number[] = [];
  public experience: number[] = [];
  public language: number[] = [];

  public datas: boolean[] = [true];
  public isCheckboxChecked = true;
  skillLevels = ['Basique', 'Professionnel', 'Avancé'];
  candidate: any = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    profileTitle: '',
    role: '',
    candidateSkills: {
      level: '',
      skill: {
        name: '',
      },
    },
  };
  form: FormGroup;
  // locationForm: FormGroup;
  filteredLanguages: Language[] = [];
  dbLanguages: any[] = [];
  activeIndex: number = 0;
  filteredSkills: Skill[] = [];
  dbSkills: any[] = [];
  index: number = 0;

  removeDatas(index: number) {
    this.datas[index] = !this.datas[index];
  }
  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private languageService: LanguageService,
    private skillService: SkillService,
    private candidateService: CandidateService
  ) {
    // this.locationForm = new FormGroup({
    //   postalCode: new FormControl(''),
    //   city: new FormControl(''),
    //   department: new FormControl(''),
    //   region: new FormControl(''),
    //   adresse: new FormControl(''),
    // });
    this.form = this.fb.group({
      personalDetails: this.fb.group({
        lastName: [''],
        firstName: [''],
        profileTitle: [''],
        phone: [''],
        email: [''],
      }),
      // location: this.locationForm, // Add location form group here
      // activities: this.fb.array([this.createActivity()]), // Initialize with one activity form group

      skills: this.fb.array([this.createSkill()]), // Ensure skills are initialized

      experiences: this.fb.array([this.createExperience()]),
      education: this.fb.array([this.createEducation()]), // initialize the education form array
      languages: this.fb.array([this.createLanguage()]), // Initialize with one language entry
    });
  }
  ngOnInit(): void {
    this.getCondidature();
    this.getLanguagesFromDb();
    this.getSSkillsFromDb();
  }

  onSubmit() {
    const profileData = this.form.value;
    this.candidateService
      .updateCandidateProfile(this.candidate?.id, profileData)
      .subscribe({
        next: (res) => {
          this.getCondidature();
          this.showSuccessModal();
        },
        error: (err) => {},
      });
    // this.router.navigate([routes.freelancerprofile]);
  }

  formatTime(date: Date) {
    const selectedDate: Date = new Date(date);
    return this.datePipe.transform(selectedDate, 'h:mm a');
  }

  getCondidature(): void {
    const email = localStorage.getItem('email');

    if (!email) {
      console.error('No email found in local storage.');
      return;
    }

    this.candidateService.getCandidate(email).subscribe({
      next: (response) => {
        this.patchFormData(response);
        this.candidate = response;
      },
      error: (error) => {
        console.error(error);
      },
    });
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
      level: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
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
    this.form.get('personalDetails')?.patchValue({
      lastName: response?.lastName || '',
      firstName: response?.firstName || '',
      profileTitle: response?.profileTitle || '',
      phone: response?.phone || '',
      email: response?.email || '',
    });

    // Patch skills
    const skills: any[] = response['candidateSkills'] || [];
    this.skillsArray.clear();

    skills.forEach((skill: any) => {
      this.skillsArray.push(
        this.fb.group({
          skillName: [skill?.skill?.name || ''], // Add skill name to form control
          level: [skill?.level || ''], // Add level if available
        })
      );
    });
    // Patch languages
    const languages: any[] = response['candidateLanguages'] || [];
    this.languagesArray.clear();

    languages.forEach((lang: any) => {
      this.languagesArray.push(
        this.fb.group({
          name: [lang?.language?.name || ''], // Add skill name to form control
          level: [lang?.level || ''], // Add level if available
        })
      );
    });

    // Patch education (formations)
    const educationData = response['formations'] || [];
    this.educationArray.clear();

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

    // Patch experiences
    const experienceData = response['experiences'] || [];
    this.experiencesArray.clear();
    experienceData.forEach((experience: any) => {
      this.experiencesArray.push(
        this.fb.group({
          companyName: [experience['companyName'] || ''],
          level: [experience['level'] || ''],
          startDate: experience['startDate'] || '',
          endDate: experience['endDate'] || '',
          description: [experience['description'] || ''],
        })
      );
    });
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
  get activities(): FormArray {
    return this.form.get('activities') as FormArray;
  }

  showSuccessModal() {
    const modalElement = document.getElementById('data-changed');
    if (modalElement) {
      modalElement.setAttribute('aria-hidden', 'false');
      modalElement.style.display = 'block';
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
      modalElement.focus();
    }
  }
}
