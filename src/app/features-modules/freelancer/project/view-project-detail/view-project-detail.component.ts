import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-view-project-detail',
  templateUrl: './view-project-detail.component.html',
  styleUrls: ['./view-project-detail.component.scss']
})
export class ViewProjectDetailComponent {
  public routes = routes;
}
