import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-completed-projects',
  templateUrl: './completed-projects.component.html',
  styleUrls: ['./completed-projects.component.scss']
})
export class CompletedProjectsComponent {
  public routes = routes;
}
