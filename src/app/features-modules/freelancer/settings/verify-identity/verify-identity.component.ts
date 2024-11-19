import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';
interface data {
  value: string;
}
@Component({
  selector: 'app-verify-identity',
  templateUrl: './verify-identity.component.html',
  styleUrls: ['./verify-identity.component.scss'],
})
export class VerifyIdentityComponent {
  public selectedValue1 = '';
  selectedList1: data[] = [
    { value: 'Select' },
    { value: 'Option1' },
    { value: 'Option2' },
  ];
  constructor(private router: Router) {}
  navigation() {
    this.router.navigate([routes.freelancer_membership]);
  }
  public routes = routes;
}
