import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { freeprojects } from 'src/app/core/models/models';

@Component({
  selector: 'app-freelancer-invitations',
  templateUrl: './freelancer-invitations.component.html',
  styleUrls: ['./freelancer-invitations.component.scss']
})
export class FreelancerInvitationsComponent {
  public routes = routes;
  public like: boolean[] = [
    false,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ];
  freeprojects: Array<freeprojects> = [];
  constructor(public router: Router, private dataservice: ShareDataService) {
    this.dataservice.ManageUsers3.subscribe((data: Array<freeprojects>) => {
      this.freeprojects = data;
    });
  }
  toggleLike(index: number) {
    this.like[index] = !this.like[index];
  }
}
