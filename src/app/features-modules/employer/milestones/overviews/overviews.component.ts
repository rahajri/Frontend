import { Component} from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-overviews',
  templateUrl: './overviews.component.html',
  styleUrls: ['./overviews.component.scss']
})
export class OverviewsComponent  {
  selected = 'Is job completed?';
  getLink = "Ongoing"
  public routes = routes

 

}
