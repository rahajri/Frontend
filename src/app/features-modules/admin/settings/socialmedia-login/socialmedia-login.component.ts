import { Component, } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-socialmedia-login',
  templateUrl: './socialmedia-login.component.html',
  styleUrls: ['./socialmedia-login.component.scss']
})
export class SocialmediaLoginComponent  {
  public routes = routes;
 

}
