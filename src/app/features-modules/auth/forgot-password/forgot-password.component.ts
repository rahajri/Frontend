import { Component,} from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent  {
  public routes = routes;
  constructor(public Router: Router) { }
  loginFormSubmit(){
    this.Router.navigate([routes.employee_dashboard])
  }
}
