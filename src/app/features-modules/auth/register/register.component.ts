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
import { AlertService } from 'src/app/core/services/alert/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public routes = routes;
  password: boolean[] = [false, false];
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

  form!: FormGroup;
  location!: FormGroup;
  constructor(
    private translate: TranslateService,
    public Router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private emailStorageService: EmailStorageService,
    private alertService: AlertService
  ) {
    this.translate.setDefaultLang(environment.defaultLanguage);

    this.signupForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, this.passwordValidator()]],
        confirmPassword: ['', [Validators.required]],
        terms: [false, Validators.requiredTrue],
      },
      { validators: this.passwordMatchValidator() }
    );

    this.signupForm.get('password')?.valueChanges.subscribe((password) => {
      this.updatePasswordValidations(password);
    });
  }

  ngOnInit(): void {}

  // Method to check the current password's validation status
  updatePasswordValidations(password: string): void {
    this.passwordValidations.minLength = password.length >= 8;
    this.passwordValidations.hasLowercase = /[a-z]/.test(password);
    this.passwordValidations.hasUppercase = /[A-Z]/.test(password);
    this.passwordValidations.hasNumber = /[0-9]/.test(password);
    this.passwordValidations.hasSpecialChar = /[!@#$%^&*+]/.test(password);
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;

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

      const data = {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        password: formValues.password,
      };

      this.userService.createUser(data).subscribe(
        (response) => {
          // Store the email in the service
          this.emailStorageService.setEmail(formValues.email);
          this.alertService.showAlert(
            'Candidature created successfully!',
            'success'
          );

          // Redirect to the VerifyEmailComponent
          this.Router.navigate(['/auth/verify-email']);
          this.verifyOtp(response?.id);
        },
        (error) => {
          console.error('Error creating user:', error);
        }
      );
    }
  }

  verifyOtp(userId: string) {
    this.userService.verifyOtp(userId).subscribe(
      (response) => {
        console.log('OTP verified successfully', response);
      },
      (error) => {
        console.error('Verification failed', error);
      }
    );
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.value;

      if (!password) return null;

      const minLength = password.length >= 8;
      const hasLowercase = /[a-z]/.test(password);
      const hasUppercase = /[A-Z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const hasSpecialChar = /[!@#$%^&*+]/.test(password);

      const errors: { [key: string]: boolean } = {};

      if (!minLength) errors['minLength'] = true;
      if (!hasLowercase) errors['hasLowercase'] = true;
      if (!hasUppercase) errors['hasUppercase'] = true;
      if (!hasNumber) errors['hasNumber'] = true;
      if (!hasSpecialChar) errors['hasSpecialChar'] = true;

      return Object.keys(errors).length ? errors : null;
    };
  }
}
