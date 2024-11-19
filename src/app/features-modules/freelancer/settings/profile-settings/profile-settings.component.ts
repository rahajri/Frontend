import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';
import { CandidateService } from 'src/app/core/services/condidate.service';
interface data {
  value: string;
}
@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent  implements OnInit{
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

  public datas : boolean[] = [true]
  public isCheckboxChecked = true;

  addSkills() {
    this.skills.push(1);
  }
  removeSkills(index: number) {
    this.skills.splice(index, 1);
  }

  addEducation() {
    this.education.push(1);
  }
  removeEducation(index: number) {
    this.education.splice(index, 1);
  }

  addCertification() {
    this.certification.push(1);
  }
  removeCertification(index: number) {
    this.certification.splice(index, 1);
  }

  addExperience() {
    this.experience.push(1);
  }
  removeExperience(index: number) {
    this.experience.splice(index, 1);
  }
  
  addLanguage() {
    this.language.push(1);
  }
  removeLanguage(index: number) {
    this.language.splice(index, 1);
  }

  selectedList1: data[] = [
    { value: 'Basic' },
    { value: 'Intermediate' },
    { value: 'Expert' },
  ];
  selectedList2: data[] = [
    { value: 'Advanced' },
    { value: 'Intermediate' },
    { value: 'Expert' },
  ];
  selectedList3: data[] = [
    { value: 'Intermediate' },
    { value: 'Basic' },
    { value: 'Expert' },
  ];
  selectedList4: data[] = [
    { value: 'Intermediate' },
    { value: 'Basic' },
    { value: 'Expert' },
  ];
  selectedList5: data[] = [
    { value: 'Select' },
    { value: 'Intermediate' },
    { value: 'Expert' },
  ];
  selectedList6: data[] = [
    { value: 'Select' },
    { value: 'Intermediate' },
    { value: 'Expert' },
  ];
  selectedList7: data[] = [
    { value: 'Select' },
    { value: 'Intermediate' },
    { value: 'Expert' },
  ];
  selectedList8: data[] = [
    { value: 'Select' },
    { value: 'Intermediate' },
    { value: 'Expert' },
  ];
  selectedList9: data[] = [
    { value: 'Select' },
    { value: 'USA' },
    { value: 'UK' },
  ];
  custom1: data[] = [
    { value: 'Basic' },
    { value: 'Intermediate' },
    { value: 'Expert' },
  ];
  candidate: any = { // Define the candidate object to hold form data
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    profileTitle: '',
    role: ''
  };
  removeDatas(index: number) {
    this.datas[index] = !this.datas[index];
  }
  constructor(private router: Router,private datePipe: DatePipe,
    private candidateService: CandidateService) {
      
    }
  ngOnInit(): void {
     this.getCondidature();
  }

  navigation() {
    this.router.navigate([routes.freelancerprofile])
  }
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

  getCondidature(): void {
    const email = localStorage.getItem('email-condidature');
    
    if (!email) {
      console.error('No email found in local storage.');
      return;
    }
  
    this.candidateService.getCandidate(email).subscribe(
      (response) => {
        console.log('Candidate details:', response);
        // Patch the response to the candidate form object
        this.candidate = { 
          ...response,
          birthDate: response.birthDate || '', // Handle null or missing birthDate
          profileTitle: response.profileTitle || '', 
          role: response.role || ''
        };
      },
      (error) => {
        console.error('Error fetching candidate details:', error);
      }
    );
  }

  
}
