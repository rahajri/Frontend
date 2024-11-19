import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-verified',
  templateUrl: './verified.component.html',
  styleUrls: ['./verified.component.scss']
})
export class VerifiedComponent {
  constructor(private router: Router) {}
  navigation() {
    this.router.navigate([routes.freelancer_membership]);
  }
public routes = routes;
}
