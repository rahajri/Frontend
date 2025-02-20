import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { routes } from 'src/app/core/helpers/routes/routes';
import { apiResultFormat } from 'src/app/core/models/models';
import { CompanyService } from 'src/app/core/services/company.service';
import { LocationService } from 'src/app/core/services/location.service';

interface data {
  value: string;
}
@Component({
  selector: 'app-onboard-employer',
  templateUrl: './onboard-employer.component.html',
  styleUrls: ['./onboard-employer.component.scss'],
})
export class OnboardEmployerComponent implements OnInit {
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
  public experience: number[] = [];
  public language: number[] = [];
  public datas: boolean[] = [true];
  public isCheckboxChecked = true;
  companiesData: any; // Variable to store the companies data
  selectedCompany: FormControl = new FormControl(''); // Initialize FormControl
  zipCodes: any[] = [];
  cities: any[] = [];
  locationForm: FormGroup;
  companyForm: FormGroup;

  constructor(
    private companyService: CompanyService,
    private fb: FormBuilder,
    private locationService: LocationService
  ) {
    this.locationForm = new FormGroup({
      postalCode: new FormControl(''),
      city: new FormControl(''),
      department: new FormControl(''),
      region: new FormControl(''),
      adresse: new FormControl(''),
    });
    this.companyForm = this.fb.group({
      name: ['', [Validators.required]],
      siret: ['', [Validators.required]],
      siren: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]], // Example: 9 digits
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]], // Example: valid phone number
      naf: ['', [Validators.required]],
      category: ['', [Validators.required]],
      workforce: ['', [Validators.required, Validators.min(1)]],
      location: this.locationForm,
      // Example: workforce must be >= 1
    });
  }
  ngOnInit(): void {
    this.getCodeZipes();
  }

  // Method to load companies data
  loadCompanies() {
    this.companyService.loadCompaniesData().subscribe(
      (data) => {
        this.companiesData = data?.data;
      },
      (error) => {
        console.error('Error loading companies data:', error); // Handle error
      }
    );
  }

  // Method to handle company selection
  onCompanySelect(event: any) {
    const selectedSiret = (event.target as HTMLSelectElement).value; // Get the selected SIRET value

    // Fetch the full company details based on the selected SIRET
    this.companyService.getCompanyBySiret(selectedSiret).subscribe({
      next: (company) => {
        console.log('Selected '); // Log the details
      },
      error: (error) => {
        console.error('Error fetching company details:', error); // Handle error
      },
    });
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

  removeDatas(index: number) {
    this.datas[index] = !this.datas[index];
  }
  selectedList1: data[] = [
    { value: 'Choose Level' },
    { value: 'Select' },
    { value: 'Full Time' },
    { value: 'Part Time' },
    { value: 'Hourly' },
  ];
  selectedList2: data[] = [
    { value: 'Choose Level' },
    { value: 'Basique' },
    { value: 'Professionnel' },
    { value: 'Avancé' },
  ];
  selectedList3: data[] = [
    { value: 'Select' },
    { value: "Bachelor's degree" },
    { value: "Master's Degree" },
  ];
  selectedList4: data[] = [
    { value: 'Select' },
    { value: 'Certification' },
    { value: 'Award' },
  ];
  selectedList5: data[] = [
    { value: 'Select' },
    { value: 'Basique' },
    { value: 'Professionnel' },
    { value: 'Avancé' },
  ];
  selectedList6: data[] = [
    { value: 'Sélectionner un niveau' },
    { value: 'Basique' },
    { value: 'Professionnel' },
    { value: 'Avancé' },
  ];
  selectedList7: data[] = [
    { value: 'Select' },
    { value: 'US' },
    { value: 'UK' },
    { value: 'India' },
  ];
  selectedList8: data[] = [
    { value: 'Select' },
    { value: 'US' },
    { value: 'UK' },
    { value: 'India' },
  ];
  getCodeZipes() {
    this.locationService.getZipCodes().subscribe(
      (data) => {
        this.zipCodes = data;
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
            region: '',
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
    const selectedCity = this.cities.find((city) => city.id === selectedCityId);

    if (selectedCity) {
      this.locationForm.patchValue({
        department: selectedCity.department.name,
        region: selectedCity.department.region.name,
      });
    }
  }

  save(form: FormGroup) {
    console.log('event', this.companyForm.value);
  }
}
