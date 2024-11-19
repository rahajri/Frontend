import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-home-five-footer',
  templateUrl: './home-five-footer.component.html',
  styleUrls: ['./home-five-footer.component.scss'],
})
export class HomeFiveFooterComponent {
  public routes = routes;
  constructor(private router: Router) {}
  navigation() {
    this.router.navigate([routes.freelancer_project]);
  }
}
