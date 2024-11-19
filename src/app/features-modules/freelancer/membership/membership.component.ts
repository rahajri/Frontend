import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.scss'],
})
export class MembershipComponent {
  public routes = routes;
  constructor(private router: Router) {}
  navigation() {
    this.router.navigate([routes.freelancer_membership]);
  }
}
