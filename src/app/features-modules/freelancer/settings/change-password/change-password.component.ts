import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import {
  showErrorModal,
  showSuccessModal,
} from 'src/app/core/services/common/common-functions';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  public fpassword: boolean[] = [true];
  public foldPassword: string = '';
  public foldPasswordStatus: boolean | null = null;
  public fnewPassword: string = '';
  public fconfirmPassword: string = '';
  public fnewPasswordValid: boolean | null = null;
  public fconfirmPasswordValid: boolean | null = null;
  public fpwMinLength: boolean = false;
  public fpwUppercase: boolean = false;
  public fpwNumber: boolean = false;
  public fpwSymbol: boolean = false;
  private email = localStorage.getItem('email') ?? null;

  constructor(private authService: AuthService) {}

  public togglePassword(index: number) {
    this.fpassword[index] = !this.fpassword[index];
  }

  ngsubmit() {
    if (!this.email || !this.fnewPasswordValid || !this.fconfirmPasswordValid)
      return;
    this.authService.setNewPassword(this.email, this.fnewPassword).subscribe({
      next: (res) => {
        showSuccessModal('password-changed');
        this.reset();
      },
      error: (err) => {
        showErrorModal('password-error');
        console.error('Erreur lors du changement de mot de passe', err);
      },
    });
  }

  onOldPasswordInput(password: string) {
    this.foldPassword = password;
    this.foldPasswordStatus = null;
    if (!this.email || !password) {
      this.foldPasswordStatus = null;
      return;
    }
    this.authService.checkCurrentPassword(this.email, password).subscribe({
      next: (res) => {
        if (res && res.valid) {
          this.foldPasswordStatus = true;
        } else {
          this.foldPasswordStatus = false;
        }
      },
      error: () => {
        this.foldPasswordStatus = false;
      },
    });
  }

  onNewPasswordInput(password: string) {
    this.fnewPassword = password;
    this.validatePasswords();
  }

  onConfirmPasswordInput(password: string) {
    this.fconfirmPassword = password;
    this.validatePasswords();
  }

  validatePasswords() {
    // Au moins 8 caractères, une majuscule, un chiffre, un symbole
    this.fpwMinLength = this.fnewPassword.length >= 8;
    this.fpwUppercase = /[A-Z]/.test(this.fnewPassword);
    this.fpwNumber = /[0-9]/.test(this.fnewPassword);
    this.fpwSymbol = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(
      this.fnewPassword
    );
    this.fnewPasswordValid =
      this.fpwMinLength &&
      this.fpwUppercase &&
      this.fpwNumber &&
      this.fpwSymbol;
    this.fconfirmPasswordValid =
      this.fnewPasswordValid && this.fnewPassword === this.fconfirmPassword;
  }

  reset() {
    this.foldPassword = '';
    this.fnewPassword = '';
    this.fconfirmPassword = '';
    this.foldPasswordStatus = null;
    this.fnewPasswordValid = null;
    this.fconfirmPasswordValid = null;
    this.fpwMinLength = false;
    this.fpwUppercase = false;
    this.fpwNumber = false;
    this.fpwSymbol = false;
    // Réinitialise aussi les affichages de mot de passe si besoin
    this.fpassword = [false, false, false, false];
  }
}
