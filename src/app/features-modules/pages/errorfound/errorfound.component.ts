import { Component  } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-errorfound',
  templateUrl: './errorfound.component.html',
  styleUrls: ['./errorfound.component.scss']
})
export class ErrorfoundComponent  {
  public routes = routes;
}
