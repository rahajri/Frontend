import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';
import * as pdfjsLib from 'pdfjs-dist'; // Use the legacy build for better compatibility
import * as Tesseract from 'tesseract.js';
import { OcrService } from 'src/app/core/services/ocr.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SpinnerService } from 'src/app/core/services/spinner/spinner.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment.prod';
import { LocationService } from 'src/app/core/services/location.service';
import { JobService } from 'src/app/core/services/job.service';
import { CandidateService } from 'src/app/core/services/condidate.service';
import { Router } from '@angular/router';
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface data {
  value: string;
}
@Component({
  selector: 'app-onboard-screen',
  templateUrl: './onboard-screen.component.html',
  styleUrls: ['./onboard-screen.component.scss'],
})
export class OnboardScreenComponent implements OnInit {
  public selectedFieldSet = [1];
  public routes = routes;
  public displayBlock = false;
  public displayNone = false;
  public selectedValue1 = '';
  public selectedValue2 = '';
  public selectedValue3 = '';
  public selectedValue4 = '';
  public selectedValue5 = '';
  public selectedValue6 = '';
  public selectedValue7 = '';
  public selectedValue8 = '';
  public skills: number[] = [];
  public education: number[] = [];
  public certification: number[] = [];
  public activity: number[] = [];

  public experience: number[] = [];
  public language: number[] = [];
  public datas: boolean[] = [true]
  public isCheckboxChecked = true;
  extractedText = '';
  spinner: boolean = false
  locationForm: FormGroup;

  username: string = 'aicha';
  cvs: File[] = [];
  form: FormGroup;

  skillLevels = ['Beginner', 'Intermediate', 'Advanced'];

  selectedListActivities = [
    { value: 'Activity 1' },
    { value: 'Activity 2' },
    { value: 'Activity 3' }
  ];

  selectedListSousActivite = [
    { value: 'Sous Activité 1' },
    { value: 'Sous Activité 2' }
  ];

  selectedListMetiers = [
    { value: 'Métier 1' },
    { value: 'Métier 2' }
  ]
  zipCodes: any[] = [];
  cities: any[] = [];
  jobs: any[] = [];

  constructor(private datePipe: DatePipe, private ocrService: OcrService,
    private translate: TranslateService,
    private fb: FormBuilder,
    private locationService: LocationService,
    private jobService: JobService,
    private candidateService: CandidateService,
    private router: Router
  ) {

    this.translate.setDefaultLang(environment.defaultLanguage);
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
        jobTitle: [''],
        birthday: [''],
        phoneNumber: [''],
        emailAddress: [''],
      }),
      location: this.locationForm, // Add location form group here
      activities: this.fb.array([this.createActivity()]), // Initialize with one activity form group

      skills: this.fb.array([]),
      experiences: this.fb.array([]),
      education: this.fb.array([]), // initialize the education form array
    });



  }
  ngOnInit(): void {
    this.getCodeZipes();
    this.getJobs();
  }

  newSkill = this.fb.group({
    skillName: [''],
    level: ['']
  });


  addSkillManually() {
    if (this.newSkill.valid) {
      // Push the new skill to skillsArray 12123dsfsGG$$
      this.skillsArray.push(this.fb.group({
        skillName: this.newSkill.get('skillName')?.value || '',
        level: this.newSkill.get('level')?.value || ''
      }));

      // Reset the temporary newSkill form group after adding
      this.newSkill.reset();
    } else {
      console.warn("Please fill out the skill and level before adding.");
    }
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
    const personal = response["Informations Personnelles"] || response["informations_personnelles"] || response['coordonnees_personnelles'];


    // Patch personal details
    this.form.get('personalDetails')?.patchValue({
      lastName: personal["Nom"] || personal["nom"] || '',
      firstName: personal["Prenom"] || personal["prenom"] || '',
      jobTitle: personal["Titre du poste ou de la mission"] || personal["titre_poste"] || '',
      birthday: personal["Date de naissance"] || personal["Date de naissance"] || '',
      phoneNumber: personal["Téléphone"] || personal["telephone"] || '',
      emailAddress: personal["E-mail"] || personal["email"] || ''
    });

    // Patch skills
    const skills: string[] = response["competences"]; // Extract skills array
    this.skillsArray.clear(); // Clear existing skills

    // Iterate through the skills and create a form group for each skill
    skills?.forEach((skillName: string) => {
      this.skillsArray.push(this.fb.group({
        skillName: [skillName || ''], // Add skill name to form control
        level: [''] // Initialize level as empty or provide a default value
      }));
    });



    const educationData = response["diplomes_certifications"] || [];
    this.educationArray.clear();

    educationData.forEach((education: any) => {
      this.educationArray.push(this.fb.group({
        degreeName: [education["Diplôme"] || education["Certification"] || education["Formation"] || education["nom"] || ''],
        universityName: [education["etablissement"] || education["Délivrée par"] || ''],
        startDate: [this.formatDateString(education["Date début"] || education["date_debut"])],
        endDate: [this.formatDateString(education["Date fin"] || education["date_fin"])],
      }));
    });

    // Patch experiences
    const experiences = response["experiences_professionnelles"] || response["Expériences professionnelles"];
    this.experiencesArray.clear();

    experiences.forEach((exp: any) => {
      let endDate = exp["date_fin"] || exp["Date fin"] || '';

      // Check if endDate is defined and if the day is 31
      if (endDate) {
        const endDateObj = new Date(endDate);
        if (endDateObj.getDate() === 31) {
          // Set the day to 1
          endDateObj.setDate(1);
          endDate = endDateObj.toISOString().split('T')[0]; // Format back to YYYY-MM-DD
        }
      }

      this.experiencesArray.push(this.fb.group({
        companyName: [exp["Entreprise"] || exp["entreprise"] || ''],
        position: [exp["Poste"] || ''],
        location: [exp["Lieu"] || ''],
        startDate: [this.formatDateString(exp["Date début"] || exp["date_debut"])],
        endDate: [this.formatDateString(exp["Date fin"] || exp["date_fin"])],
      }));
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
  newExperience = this.fb.group({
    companyName: ['', Validators.required],
    position: ['', Validators.required],
    location: [''],
    startDate: [''],
    endDate: ['']
  });

  addExperience() {
    if (this.newExperience.valid) {
      this.experiencesArray.push(this.fb.group({
        companyName: this.newExperience.get('companyName')?.value || '',
        position: this.newExperience.get('position')?.value || '',
        location: this.newExperience.get('location')?.value || '',
        startDate: this.newExperience.get('startDate')?.value || '',
        endDate: this.newExperience.get('endDate')?.value || ''
      }));
      this.newExperience.reset(); // Clear fields after adding
    } else {
      console.warn("Please fill out all required fields before adding.");
    }
  }

  removeExperience(index: number) {
    this.experiencesArray.removeAt(index);
  }
  get experiencesArray(): FormArray {
    return this.form.get('experiences') as FormArray;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.spinner = true
      this.cvs = Array.from(input.files);

      // Call the API and patch form with the response
      if (this.cvs.length > 0) {
        this.ocrService.runPipeline(this.username, this.cvs).subscribe(
          (response) => {
            const cleanedResponse = response.Result.replace(/json|/g, '').trim();
            const jsonObject = JSON.parse(cleanedResponse);
            console.log('jsonObject:', jsonObject);
            // Call the patch function to populate the form
            this.patchFormData(jsonObject);
            this.spinner = false
          },
          (error) => {
            console.error('Error:', error);
          }
        );
      } else {
        console.warn('Please enter a username.');
      }
    }
  }


  get educationArray(): FormArray {
    return this.form.get('education') as FormArray;
  }
  newEducation = this.fb.group({
    degreeName: [''],
    universityName: [''],
    startDate: [''],
    endDate: ['']
  });
  addEducation() {
    if (this.newEducation.valid) {
      this.educationArray.push(this.fb.group({
        degreeName: this.newEducation.get('degreeName')?.value || '',
        universityName: this.newEducation.get('universityName')?.value || '',
        startDate: this.newEducation.get('startDate')?.value || '',
        endDate: this.newEducation.get('endDate')?.value || ''
      }));
      this.newEducation.reset();  // Clear the fields after adding
    } else {
      console.warn("Please fill out all fields before adding.");
    }
  }


  removeEducation(index: number) {
    this.educationArray.removeAt(index);
  }


  block() {
    this.displayBlock = !this.displayBlock;
  }
  none() {
    this.displayNone = !this.displayNone;
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
    this.activities.insert(0, this.createActivity());  // Insert at the first position (index 0)
  }

  removeActivity(index: number) {
    this.activities.removeAt(index);
  }


  addLanguage() {
    this.language.push(1);
  }
  removeLanguage(index: number) {
    this.language.splice(index, 1);
  }




  removeDatas(index: number) {
    this.datas[index] = !this.datas[index];
  }

  selectedList6: data[] = [
    { value: 'Choose Level' },
    { value: 'Basic' },
    { value: 'Intermediate' },
    { value: 'Proficient' },
  ];

  showTimePicker: Array<string> = [];

  public hoursArray1 = [0];
  public hoursArray2 = [0];
  public hoursArray3 = [0];
  public hoursArray4 = [0];
  public hoursArray5 = [0];
  public hoursArray6 = [0];
  public hoursArray7 = [0];

  startTime1 = new Date();
  startTime2 = new Date();
  startTime3 = new Date();
  startTime4 = new Date();
  startTime5 = new Date();
  startTime6 = new Date();
  startTime7 = new Date();
  endTime1 = new Date();
  endTime2 = new Date();
  endTime3 = new Date();
  endTime4 = new Date();
  endTime5 = new Date();
  endTime6 = new Date();
  endTime7 = new Date();


  toggleTimePicker(value: string): void {
    if (this.showTimePicker[0] !== value) {
      this.showTimePicker[0] = value;
    } else {
      this.showTimePicker = [];
    }
  }
  formatTime(date: Date) {
    const selectedDate: Date = new Date(date);
    return this.datePipe.transform(selectedDate, 'h:mm a');
  }

  getCodeZipes() {
    this.locationService.getZipCodes().subscribe(
      (data) => {
        this.zipCodes = data;
        console.log('ZIP Codes:', this.zipCodes);
      },
      (error) => {
        console.error('Error fetching ZIP codes:', error);
      }
    );
  }
  onZipCodeChange(event: Event): void {
    const selectedZipId = (event.target as HTMLSelectElement).value;
    if (selectedZipId) {
      this.locationService.getZipCodeInfo(selectedZipId).subscribe(
        (data) => {
          this.cities = data.cities; // Update the cities list

          // Reset department and region fields
          this.locationForm.patchValue({
            city: '',
            department: '',
            region: ''
          });
        },
        (error) => {
          console.error('Error fetching ZIP code info:', error);
        }
      );
    }
  }

  onCityChange(event: Event): void {
    const selectedCityId = (event.target as HTMLSelectElement).value;
    const selectedCity = this.cities.find(city => city.id === selectedCityId);

    if (selectedCity) {
      this.locationForm.patchValue({
        department: selectedCity?.department?.name,
        region: selectedCity?.department?.region?.name
      });
    }
  }


  get activities(): FormArray {
    return this.form.get('activities') as FormArray;
  }

  getJobs() {
    // Fetch the list of jobs (Métier) on component initialization
    this.jobService.getJobs().subscribe(data => {
      this.jobs = data;
    });
  }
  onJobChange(event: any, index: number) {
    const jobId = event.target.value;
    if (jobId) {
      // Fetch sous-activités and activités based on the selected job
      this.jobService.getJobDetails(jobId).subscribe(data => {
        const activityGroup = this.activities.at(index);
        activityGroup.patchValue({
          sousActivite: data?.subActivity?.name,
          activite: data?.subActivity?.activity?.name,
        });
      });
    }
  }


  create(event: any) {
    const candidateData = new FormData();
    candidateData.append('userInformation', JSON.stringify(this.form.value));
    candidateData.append('cv', this.cvs[0]);

    this.candidateService.createCandidate(candidateData).subscribe(
      (response) => {

        console.log('Candidate created successfully:', response);
        this.router.navigate(['/freelancer/dashboards']);
      },
      (error) => {
        console.error('Error creating candidate:', error);
      }
    );


  }
}
