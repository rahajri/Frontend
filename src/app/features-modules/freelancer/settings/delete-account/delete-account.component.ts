import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss'],
})
export class DeleteAccountComponent {
  public password = false;

  togglePassword() {
    this.password = !this.password;
  }
  constructor(private router: Router) {}
  navigation() {
    this.router.navigate([routes.freelancer_membership]);
  }
  public routes = routes;
}
