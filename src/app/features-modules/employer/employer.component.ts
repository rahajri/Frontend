import { Component,  } from '@angular/core';
import {  NavigationStart, Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/common/common.service';
import { ShareDataService } from 'src/app/core/data/share-data.service';
@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.scss']
})
export class EmployerComponent  {
  empolyee = true;
  breadcrum =true;
  base="";
  page="";
  last ="";
  url!: string;
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

  
  getRoutes(event: Router | NavigationStart){
    const splitVal = event.url.split('/');
        this.base = splitVal[1];
        this.page = splitVal[2];
        this.last = splitVal[3];
        if (
          event.url === '/employer/company-profile' ||
          event.url === '/employer/company-details' ||
          event.url === '/employer/company-project' ||
          event.url === '/employer/company-gallery' ||
          event.url === '/employer/company-reviews' || 
          event.url === '/employer/chats' ||
          event.url === '/employer/post-project' ||
          event.url === '/employer/developer' ||
          event.url === '/employer/notification' ||
          event.url === '/employer/developer-list' ||
          event.url === '/employer/developer-details'||
          event.url === '/employer/developer'||
          event.url === '/employer/project-confirmation'
          


          

        ) {
          this.empolyee = false;
          this.breadcrum = false;
        } else {
          this.empolyee = true;
          this.breadcrum = true;
        }
        // if(
        //   event.url === '/employer/chats'
        // ){
        //   this.breadcrum = false;
        // }else{
        //   this.breadcrum = true;
        // }
  }
}
