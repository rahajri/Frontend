import { Component,  } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent  {
  public routes = routes;
  removePic = true;
  removeIcon = true;
  
  removePicture(){
    this.removePic = !this.removePic; 
  }
  removeFavicon(){
    this.removeIcon = !this.removeIcon; 
  }
 

}
