import { Component,  } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { freelancerlist } from 'src/app/core/models/models';

@Component({
  selector: 'app-markedfavourites',
  templateUrl: './markedfavourites.component.html',
  styleUrls: ['./markedfavourites.component.scss']
})
export class MarkedfavouritesComponent  {
  public like: boolean[] = [false];
  public routes = routes
  freelancer: Array<freelancerlist> = [];
  constructor( public router: Router, private dataservice: ShareDataService) {
    this.dataservice.ManageUsers1.subscribe((data: Array<freelancerlist>) => {
      this.freelancer = data
    })
   }
   toggleLike(index: number) {
    this.like[index] = !this.like[index];
  }

}