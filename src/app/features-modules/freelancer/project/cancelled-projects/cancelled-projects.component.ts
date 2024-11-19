import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-cancelled-projects',
  templateUrl: './cancelled-projects.component.html',
  styleUrls: ['./cancelled-projects.component.scss']
})
export class CancelledProjectsComponent {
  public routes = routes;
}
