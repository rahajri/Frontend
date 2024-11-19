import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { empprojects } from 'src/app/core/models/models';

@Component({
  selector: 'app-expired-project',
  templateUrl: './expired-project.component.html',
  styleUrls: ['./expired-project.component.scss']
})
export class ExpiredProjectComponent {
  public routes = routes
  empprojects: Array<empprojects> = [];
  constructor( public router: Router, private dataservice: ShareDataService) {
    this.dataservice.ManageUsers.subscribe((data: Array<empprojects>) => {
      this.empprojects = data
    })
   }

}
