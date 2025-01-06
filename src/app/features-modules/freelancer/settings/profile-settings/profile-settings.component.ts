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
interface data {
  value: string;
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
  locationForm: FormGroup;

  removeDatas(index: number) {
    this.datas[index] = !this.datas[index];
  }
  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private fb: FormBuilder,

    private candidateService: CandidateService
  ) {
    this.locationForm = new FormGroup({
      postalCode: new FormControl(''),
      city: new FormControl(''),
      department: new FormControl(''),
      region: new FormControl(''),
      adresse: new FormControl(''),
    });
    this.form = this.fb.group({
      personalDetails: this.fb.group({
        lastName: [''],
        firstName: [''],
        profileTitle: [''],
        phone: [''],
        email: [''],
      }),
      location: this.locationForm, // Add location form group here
      activities: this.fb.array([this.createActivity()]), // Initialize with one activity form group

      skills: this.fb.array([this.createSkill()]), // Ensure skills are initialized

      experiences: this.fb.array([this.createExperience()]),
      education: this.fb.array([this.createEducation()]), // initialize the education form array
      languages: this.fb.array([this.createLanguage()]), // Initialize with one language entry
    });
  }
  ngOnInit(): void {
    this.getCondidature();
  }

  navigation() {
    console.log(this.form.value);
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

    this.candidateService.getCandidate(email).subscribe(
      (response) => {
        console.log('Candidate details:', response);

        this.patchFormData(response);
        // Patch the response to the candidate form object
        this.candidate = {
          ...response,
          birthDate: response.birthDate || '', // Handle null or missing birthDate
          profileTitle: response.profileTitle || '',
          role: response.role || '',
        };
      },
      (error) => {
        console.error('Error fetching candidate details:', error);
      }
    );
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
      position: ['', Validators.required],
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
    // Patch personal details
    this.form.get('personalDetails')?.patchValue({
      lastName: response['Nom'] || response['nom'] || '',
      firstName: response['Prenom'] || response['prenom'] || '',
      jobTitle:
        response['Titre du poste ou de la mission'] ||
        response['titre_poste'] ||
        '',
      birthday:
        response['Date de naissance'] || response['Date de naissance'] || '',
      phoneNumber: response['Téléphone'] || response['telephone'] || '',
      emailAddress: response['E-mail'] || response['email'] || '',
    });

    // Patch skills
    const skills: string[] = response['skills']; // Extract skills array
    this.skillsArray.clear(); // Clear existing skills

    // Iterate through the skills and create a form group for each skill
    skills?.forEach((skillName: any) => {
      this.skillsArray.push(
        this.fb.group({
          skillName: [skillName?.name || ''], // Add skill name to form control
          level: [''], // Initialize level as empty or provide a default value
        })
      );
    });

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
          startDate: [
            this.formatDateString(
              education['Date début'] || education['startDate']
            ),
          ],
          endDate: [
            this.formatDateString(
              education['Date fin'] || education['endDate']
            ),
          ],
        })
      );
    });

    const skillsData = response['candidateSkills'] || [];
    this.skillsArray.clear();

    skillsData.forEach((candidateSkill: any) => {
      this.skillsArray.push(
        this.fb.group({
          skillName: candidateSkill['skill']['name'] || '',
          level: candidateSkill['level'] || '',
        })
      );
    });

    const languageData = response['candidateLanguages'] || [];
    this.languageArray.clear();

    languageData.forEach((language: any) => {
      this.languageArray.push(
        this.fb.group({
          name: [language['language']['name'] || ''],
          level: [language['level'] || ''],
        })
      );
    });

    // Patch experiences
    const experiences =
      response['experiences'] || response['Expériences professionnelles'];
    this.experiencesArray.clear();

    experiences.forEach((exp: any) => {
      let endDate = exp['endDate'] || exp['Date fin'] || '';

      // Check if endDate is defined and if the day is 31
      if (endDate) {
        const endDateObj = new Date(endDate);
        if (endDateObj.getDate() === 31) {
          // Set the day to 1
          endDateObj.setDate(1);
          endDate = endDateObj.toISOString().split('T')[0]; // Format back to YYYY-MM-DD
        }
      }

      this.experiencesArray.push(
        this.fb.group({
          companyName: [exp['companyName'] || exp['entreprise'] || ''],
          position: [exp['jobTitle'] || ''],
          location: [exp['Lieu'] || ''],
          startDate: [
            this.formatDateString(exp['Date début'] || exp['startDate']),
          ],
          endDate: [this.formatDateString(exp['Date fin'] || exp['endDate'])],
        })
      );
    });
  }

  formatDateString(dateStr: string | undefined): string | null {
    if (!dateStr) return null;

    const dateParts = dateStr.split('/');
    if (dateParts.length !== 3) return null; // Ensure date is in DD/MM/YYYY format

    const day = +dateParts[0];
    const month = +dateParts[1] - 1; // Months are 0-based in JavaScript Date
    const year = +dateParts[2];

    const formattedDate = new Date(year, month, day);
    if (isNaN(formattedDate.getTime())) return null; // Check if date is valid

    return this.datePipe.transform(formattedDate, 'dd/MM/yyyy'); // Format to "DD/MM/YYYY"
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
    this.activities.insert(0, this.createActivity()); // Insert at the first position (index 0)
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
}
