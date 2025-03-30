import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/common/common.service';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { header } from 'src/app/core/models/sidebar-model';
import { url } from 'src/app/core/models/models';
@Component({
  selector: 'app-freelancer',
  templateUrl: './freelancer.component.html',
  styleUrls: ['./freelancer.component.scss'],
})
export class FreelancerComponent {
  breadcrum = true;
  freelancer = true;
  base = '';
  page = '';
  last = '';
  url!: string;

  sidebar: Array<header> = [];
  constructor(
    private Router: Router,
    private common: CommonService,
    private data: ShareDataService
  ) {
    this.common.base.subscribe((res: string) => {
      this.base = res;
    });
    this.common.page.subscribe((res: string) => {
      this.page = res;
    });
    this.common.last.subscribe((res: string) => {
      this.last = res;
    });
    Router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.getRoutes(event);
      }
    });
    this.getRoutes(this.Router);
  }

  getRoutes(event: url) {
    const splitVal = event.url.split('/');
    this.base = splitVal[1];
    this.page = splitVal[2];
    this.last = splitVal[3];
    if (
      event.url === '/freelancer/chats' ||
      event.url === '/freelancer/project' ||
      event.url === '/freelancer/project-details' ||
      event.url === '/freelancer/candidate-profile' ||
      event.url === '/freelancer/developers-details' ||
      event.url === '/freelancer/project-list'
    ) {
      this.freelancer = false;
      this.breadcrum = false;
    } else {
      this.freelancer = true;
      this.breadcrum = true;
    }
  }
}
