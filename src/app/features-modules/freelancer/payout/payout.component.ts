import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-payout',
  templateUrl: './payout.component.html',
  styleUrls: ['./payout.component.scss']
})
export class PayoutComponent {
  public routes = routes;

  constructor(private router: Router) {}
  navigation() {
    this.router.navigate([routes.freelancer_portfolio]);
  }

}
