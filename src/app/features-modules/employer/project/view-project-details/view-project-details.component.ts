import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-view-project-details',
  templateUrl: './view-project-details.component.html',
  styleUrls: ['./view-project-details.component.scss']
})
export class ViewProjectDetailsComponent {
public routes = routes
}
