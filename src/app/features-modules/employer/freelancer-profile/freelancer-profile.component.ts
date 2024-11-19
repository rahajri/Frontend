import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-freelancer-profile',
  templateUrl: './freelancer-profile.component.html',
  styleUrls: ['./freelancer-profile.component.scss']
})
export class FreelancerProfileComponent {
  public routes = routes;
}
