import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-home-four-footer',
  templateUrl: './home-four-footer.component.html',
  styleUrls: ['./home-four-footer.component.scss']
})
export class HomeFourFooterComponent  {
  public routes = routes;
  constructor(private router: Router) {}
  navigation() {
    this.router.navigate([routes.freelancer_project]);
  }
}
