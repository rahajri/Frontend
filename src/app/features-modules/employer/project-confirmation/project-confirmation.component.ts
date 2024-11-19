import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-project-confirmation',
  templateUrl: './project-confirmation.component.html',
  styleUrls: ['./project-confirmation.component.scss']
})
export class ProjectConfirmationComponent {
  public routes = routes;
}
