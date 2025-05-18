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
  public password: boolean[] = [true];
  public oldPassword: string = '';
  public oldPasswordStatus: boolean | null = null;
  public newPassword: string = '';
  public confirmPassword: string = '';
  public newPasswordValid: boolean | null = null;
  public confirmPasswordValid: boolean | null = null;
  public pwMinLength: boolean = false;
  public pwUppercase: boolean = false;
  public pwNumber: boolean = false;
  public pwSymbol: boolean = false;
  private email = localStorage.getItem('email') ?? null;

  constructor(private authService: AuthService) {}

  public togglePassword(index: number) {
    this.password[index] = !this.password[index];
  }

  ngsubmit() {
    if (!this.email || !this.newPasswordValid || !this.confirmPasswordValid)
      return;
    this.authService.setNewPassword(this.email, this.newPassword).subscribe({
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
    this.oldPassword = password;
    this.oldPasswordStatus = null;
    if (!this.email || !password) {
      this.oldPasswordStatus = null;
      return;
    }
    this.authService.checkCurrentPassword(this.email, password).subscribe({
      next: (res) => {
        if (res && res.valid) {
          this.oldPasswordStatus = true;
        } else {
          this.oldPasswordStatus = false;
        }
      },
      error: () => {
        this.oldPasswordStatus = false;
      },
    });
  }

  onNewPasswordInput(password: string) {
    this.newPassword = password;
    this.validatePasswords();
  }

  onConfirmPasswordInput(password: string) {
    this.confirmPassword = password;
    this.validatePasswords();
  }

  validatePasswords() {
    // Au moins 8 caractères, une majuscule, un chiffre, un symbole
    this.pwMinLength = this.newPassword.length >= 8;
    this.pwUppercase = /[A-Z]/.test(this.newPassword);
    this.pwNumber = /[0-9]/.test(this.newPassword);
    this.pwSymbol = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(
      this.newPassword
    );
    this.newPasswordValid =
      this.pwMinLength && this.pwUppercase && this.pwNumber && this.pwSymbol;
    this.confirmPasswordValid =
      this.newPasswordValid && this.newPassword === this.confirmPassword;
  }

  reset() {
    this.oldPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.oldPasswordStatus = null;
    this.newPasswordValid = null;
    this.confirmPasswordValid = null;
    this.pwMinLength = false;
    this.pwUppercase = false;
    this.pwNumber = false;
    this.pwSymbol = false;
    // Réinitialise aussi les affichages de mot de passe si besoin
    this.password = [false, false, false, false];
  }
}
