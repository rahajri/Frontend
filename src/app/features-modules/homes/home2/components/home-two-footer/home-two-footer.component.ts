import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-two-footer',
  templateUrl: './home-two-footer.component.html',
  styleUrls: ['./home-two-footer.component.scss']
})
export class HomeTwoFooterComponent  {
  public routes = routes;
  constructor(private router: Router) {}
  navigation() {
    this.router.navigate([routes.employee_all_projects]);
  }
}
