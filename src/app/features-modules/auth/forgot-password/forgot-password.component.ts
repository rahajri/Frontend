import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { markFormGroupTouched } from 'src/app/core/services/common/common-functions';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  public routes = routes;
  forgotPasswordForm: FormGroup;
  errorMessage: string = '';
  successSend: boolean = false;

  constructor(
    public Router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)],
      ],
    });
  }

  ngOnInit() {
    // Réinitialiser le message d'erreur au démarrage
    this.errorMessage = '';

    // Surveiller les changements de valeur du champ email
    this.forgotPasswordForm.get('email')?.valueChanges.subscribe(() => {
      // Réinitialiser le message d'erreur à chaque modification du champ email
      if (this.errorMessage) {
        this.errorMessage = '';
      }
    });
  }

  loginFormSubmit() {
    this.successSend = false;
    markFormGroupTouched(this.forgotPasswordForm);
    if (this.forgotPasswordForm.invalid) return;
    const { email } = this.forgotPasswordForm.value;
    this.authService.forgotPassword(email).subscribe({
      next: (res) => {
        this.successSend = true;
      },
      error: (err) => {
        this.successSend = false;
        // Gestion spécifique de l'erreur 404
        if (err.status === 404) {
          this.errorMessage =
            'Adresse e-mail introuvable. Veuillez vérifier votre saisie.';
        } else {
          this.errorMessage =
            err.error?.message ||
            "Une erreur est survenue lors de l'envoi de l'e-mail.";
        }
      },
    });
  }
}
