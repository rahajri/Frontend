import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent  {
  public routes = routes;
  constructor(private router: Router) {}
  navigation() {
    this.router.navigate([routes.freelancer_project]);
  }
}
