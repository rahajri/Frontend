import { Component,  } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-localization',
  templateUrl: './localization.component.html',
  styleUrls: ['./localization.component.scss']
})
export class LocalizationComponent {
  public routes = routes;
}
