import { Component,  } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import {  freelancerlist } from 'src/app/core/models/models';
interface data {
  value: string;
}

@Component({
  selector: 'app-freelancer',
  templateUrl: './freelancer.component.html',
  styleUrls: ['./freelancer.component.scss']
})
export class FreelancerComponent  {
  public like: boolean[] = [false];
  selected = 'Relevance';
  getLink = "project"
  public routes = routes
  
  freelancer: Array<freelancerlist> = [];
  constructor( public router: Router, private dataservice: ShareDataService) {
    this.dataservice.ManageUsers1.subscribe((data: Array<freelancerlist>) => {
      this.freelancer = data
    })
   }
   public selectedValue1 = '';
   selectedList1: data[] = [
     { value: 'Sort by (Default)' },
     { value: 'Relevance' },
     { value: 'Rating' },
     { value: 'Popular' },
     { value: 'Latest' },
     { value: 'Free' },
   ];
  

   submitForm() {
    
     this.router.navigate(['/freelancer/project']);
   }
   toggleLike(index: number) {
    this.like[index] = !this.like[index];
  }

}