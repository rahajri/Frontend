import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-home-three-footer',
  templateUrl: './home-three-footer.component.html',
  styleUrls: ['./home-three-footer.component.scss']
})
export class HomeThreeFooterComponent  {
  public routes = routes;
}
