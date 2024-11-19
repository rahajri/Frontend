import { Component  } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent  {
  public password: boolean[] = [true];

  public togglePassword(index: number) {
    this.password[index] = !this.password[index];
  }
  public routes = routes
  constructor(public Router: Router) { }
  loginFormSubmit(){
    this.Router.navigate([routes.employee_dashboard])
  }

}
