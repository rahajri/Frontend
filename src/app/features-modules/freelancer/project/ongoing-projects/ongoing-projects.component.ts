import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-ongoing-projects',
  templateUrl: './ongoing-projects.component.html',
  styleUrls: ['./ongoing-projects.component.scss']
})
export class OngoingProjectsComponent {
  public routes = routes;
}
