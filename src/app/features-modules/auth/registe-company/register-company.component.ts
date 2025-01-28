import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Validators } from '@angular/forms';
import { routes } from 'src/app/core/helpers/routes/routes';
import { UserService } from '../service/user.service';
import { EmailStorageService } from '../service/email-storage.service';
import { environment } from 'src/environments/environment';
import { CompanyService } from 'src/app/core/services/company.service';
import { LocationService } from 'src/app/core/services/location.service';
import { InseeApiService } from 'src/app/core/services/insee-api.service';
import { AlertService } from 'src/app/core/services/alert/alert.service';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.scss'],
})
export class RegisterCompanyComponent {
  public routes = routes;
  password: boolean[] = [false, false]; // For toggle visibility of password fields
  companiesData: any;
  signupForm!: FormGroup;
  passwordValidations = {
    minLength: false,
    hasLowercase: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  };
  selectedNaf: any;
  selectedCompany: any;
  siretErrorMessage: string | null = null;

  form!: FormGroup;
  location!: FormGroup;
  constructor(
    private translate: TranslateService,
    public Router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private emailStorageService: EmailStorageService,
    private companyService: CompanyService,
    private locationService: LocationService,
    private inseeApiService: InseeApiService,
    private alertService: AlertService
  ) {
    this.translate.setDefaultLang(environment.defaultLanguage);

    this.signupForm = this.fb.group(
      {
        terms: [false],

        user: this.fb.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          phone: ['', [Validators.required]],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, this.passwordValidator()]],
          confirmPassword: ['', [Validators.required]],
        }),
        company: this.fb.group({
          siret: [''],
          name: [''],
          nafTitle: [''],
          naf: [''],
          category: [''],
          workforce: [''],
          message: [''],
          location: this.fb.group({
            postalCode: [''],
            city: [''],
            department: [''],
            region: [''],
            address: [''],
            addressLine2: [''],
          }),
        }),
      },
      { validators: this.passwordMatchValidator() }
    );

    this.signupForm.get('user.password')?.valueChanges.subscribe((password) => {
      this.updatePasswordValidations(password);
    });
  }

  ngOnInit(): void {
    //this.loadCompanies();
  }

  // Method to check the current password's validation status
  // Method to check the current password's validation status
  updatePasswordValidations(password: string): void {
    this.passwordValidations.minLength = password.length >= 8;
    this.passwordValidations.hasLowercase = /[a-z]/.test(password);
    this.passwordValidations.hasUppercase = /[A-Z]/.test(password);
    this.passwordValidations.hasNumber = /[0-9]/.test(password);
    this.passwordValidations.hasSpecialChar = /[!@#$%^&*]/.test(password);
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const password = control.get('user.password')?.value;
      const confirmPassword = control.get('user.confirmPassword')?.value;

      return password && confirmPassword && password !== confirmPassword
        ? { passwordsMismatch: true }
        : null;
    };
  }

  public togglePassword(index: number) {
    this.password[index] = !this.password[index];
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const formValues = this.signupForm.value;
      const randomSixDigitNumber = Math.floor(100000 + Math.random() * 900000); // Generates a random 6-digit number
      const username = `${formValues.firstName}${randomSixDigitNumber}`;
      let data = this.signupForm.value;

      this.userService.createCompany(data).subscribe(
        (response) => {
          // Store the email in the service
          this.emailStorageService.setEmail(response?.user.email);
          this.alertService.showAlert(
            'company created successfully!',
            'success'
          );

          // Redirect to the VerifyEmailComponent
          this.Router.navigate(['/auth/verify-email']);
          this.verifyOtp(response?.user.id);
        },
        (error) => {
          console.error('Error creating user:', error);
        }
      );
    }
  }

  verifyOtp(userId: string) {
    this.userService.verifyOtp(userId).subscribe({
      next: (response) => {},
      error: (error) => {
        console.error('Verification failed', error);
      },
    });
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.value;
      if (!password) return null;

      const minLength = password.length >= 8;
      const hasLowercase = /[a-z]/.test(password);
      const hasUppercase = /[A-Z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const hasSpecialChar = /[!@#$%^&*]/.test(password);

      const errors: { [key: string]: boolean } = {};

      if (!minLength) errors['minLength'] = true;
      if (!hasLowercase) errors['hasLowercase'] = true;
      if (!hasUppercase) errors['hasUppercase'] = true;
      if (!hasNumber) errors['hasNumber'] = true;
      if (!hasSpecialChar) errors['hasSpecialChar'] = true;

      return Object.keys(errors).length ? errors : null;
    };
  }

  loadCompanies() {
    this.companyService.loadCompaniesData().subscribe(
      (data) => {
        this.companiesData = data?.data;
        // Store the data in the component's variable
      },
      (error) => {
        console.error('Error loading companies data:', error); // Handle error
      }
    );
  }

  getDepartmentRegion(city: string): void {
    this.locationService.getcityInfo(city).subscribe(
      (data) => {
        if (data && data.department && data.department.region) {
          this.signupForm.patchValue({
            company: {
              location: {
                department: data.department.name,
                region: data.department.region.name,
              },
            },
          });
        } else {
          console.warn('Incomplete location data returned for city:', city);
        }
      },
      (error) => {
        console.error('Error fetching ZIP code info:', error);
      }
    );
  }

  getSiretDetails(event: Event): void {
    const siret = (event.target as HTMLInputElement).value;

    if (!siret) {
      console.error('SIRET is empty');
      this.siretErrorMessage = 'Le SIRET ne peut pas être vide.';
      return;
    }

    // Check if SIRET exists before proceeding
    this.companyService.checkSiretExists(siret).subscribe({
      next: (data) => {
        if (data.exists) {
          this.siretErrorMessage = data.message;
          return;
        }

        this.inseeApiService.getSiretDetails(siret).subscribe({
          next: (data) => {
            this.siretErrorMessage = null; // Clear previous error

            const etablissement = data?.etablissement || {};
            const uniteLegale = etablissement.uniteLegale || {};
            const adresse = etablissement.adresseEtablissement || {};

            this.getDepartmentRegion(adresse.libelleCommuneEtablissement);

            const naf =
              etablissement?.periodesEtablissement?.[0]?.activitePrincipaleEtablissement?.replace(
                '.',
                ''
              );

            this.signupForm.patchValue({
              company: {
                name: uniteLegale?.denominationUniteLegale || '',
                category: uniteLegale?.categorieEntreprise || '',
                workforce: uniteLegale?.trancheEffectifsUniteLegale || 0,
                naf: naf || '',
                location: {
                  address: `${adresse?.numeroVoieEtablissement || ''} ${
                    adresse?.typeVoieEtablissement || ''
                  } ${adresse?.libelleVoieEtablissement || ''}`.trim(),
                  addressLine2: adresse?.complementAdresseEtablissement || '',
                  postalCode: adresse?.codePostalEtablissement || '',
                  city: adresse?.libelleCommuneEtablissement || '',
                },
              },
            });

            if (naf) {
              this.companyService.getNafByCompany(naf).subscribe({
                next: (nafValue) => {
                  if (nafValue) {
                    this.signupForm.patchValue({
                      company: {
                        nafTitle: nafValue.INTITULÉS,
                      },
                    });
                  }
                },
                error: (error) => {
                  console.error('Error fetching NAF details:', error);
                },
              });
            }
          },
          error: (error) => {
            this.siretErrorMessage = error?.message;
          },
        });
      },
      error: (error) => {
        this.siretErrorMessage = 'Error checking SIRET existence.';
      },
    });
  }
}
