import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.scss'],
})
export class StatementComponent {
  constructor(private router: Router) {}
  navigation() {
    this.router.navigate([routes.freelancer_membership]);
  }
  public routes = routes;
}
