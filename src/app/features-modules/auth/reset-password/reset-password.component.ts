import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  public password: boolean[] = [true];
  public routes = routes

  public togglePassword(index: number) {
    this.password[index] = !this.password[index];
  }
  constructor(public Router: Router) { }
  loginFormSubmit(){
    this.Router.navigate([routes.employee_dashboard])
  }
}
