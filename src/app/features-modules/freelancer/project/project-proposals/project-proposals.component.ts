import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-project-proposals',
  templateUrl: './project-proposals.component.html',
  styleUrls: ['./project-proposals.component.scss']
})
export class ProjectProposalsComponent {
  public routes = routes;
}
