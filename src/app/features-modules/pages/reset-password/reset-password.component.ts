import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { routes } from 'src/app/core/helpers/routes/routes';
import { Validators } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  password: boolean[] = [false, false];
  resetForm!: FormGroup;
  passwordValidations = {
    minLength: false,
    hasLowercase: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  };
  token: string | null = null;

  public togglePassword(index: number) {
    this.password[index] = !this.password[index];
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.resetForm = this.fb.group(
      {
        password: ['', [Validators.required, this.passwordValidator()]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator() }
    );
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
    console.log('Token', this.token);

    this.resetForm.get('password')?.valueChanges.subscribe((password) => {
      this.updatePasswordValidations(password);
    });
  }

  onSubmit() {
    // Mark all controls as touched to trigger validation
    this.resetForm.markAllAsTouched();

    // Optionally, you can check the validity here and take further actions
    if (this.resetForm.valid) {
      // Submit the form data if valid
      console.log('Form submitted:', this.resetForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  updatePasswordValidations(password: string): void {
    this.passwordValidations.minLength = password.length >= 8;
    this.passwordValidations.hasLowercase = /[a-z]/.test(password);
    this.passwordValidations.hasUppercase = /[A-Z]/.test(password);
    this.passwordValidations.hasNumber = /[0-9]/.test(password);
    this.passwordValidations.hasSpecialChar = /[!@#$%^&*]/.test(password);
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

  showSuccessModal() {
    const modalElement = document.getElementById('data-changed');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  onCancel() {
    this.resetForm.reset({
      password: '',
      confirmPassword: '',
    });
  }
}
