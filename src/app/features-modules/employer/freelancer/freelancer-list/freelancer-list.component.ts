import { Component,  } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { freelancerlist } from 'src/app/core/models/models';

@Component({
  selector: 'app-freelancer-list',
  templateUrl: './freelancer-list.component.html',
  styleUrls: ['./freelancer-list.component.scss']
})
export class FreelancerListComponent  {
  public routes = routes
  selected = 'Relevance';
  freelancer: Array<freelancerlist> = [];
  constructor( public router: Router, private dataservice: ShareDataService) {
    this.dataservice.ManageUsers1.subscribe((data: Array<freelancerlist>) => {
      this.freelancer = data
    })
   }
  

}