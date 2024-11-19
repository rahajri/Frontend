import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { header } from 'src/app/core/models/sidebar-model';
import { CommonService } from 'src/app/core/services/common/common.service';
import { NavbarService } from 'src/app/core/services/navbar.service';

@Component({
  selector: 'app-employerheader',
  templateUrl: './employerheader.component.html',
  styleUrls: ['./employerheader.component.scss'],
})
export class EmployerheaderComponent {
  public routes = routes;
  base = '';
  page = '';
  last = '';

  navbar: Array<header> = [];
  constructor(
    private Router: Router,
    private data: ShareDataService,
    private navservices: NavbarService,
    private common: CommonService
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
    this.navbar = this.data.sideBar;
  }

  employer() {
    localStorage.setItem('employer', 'employer');
  }
  freelancer() {
    localStorage.setItem('freelancer', 'freelancer');
  }
  setLocalStorage(value: string): void {
    localStorage.setItem(value, value);
  }
  otherPages(val: string) {
    localStorage.setItem(val, val);
  }
  public toggleSidebar(): void {
    this.navservices.openSidebar();
  }
  public hideSidebar(): void {
    this.navservices.closeSidebar();
  }
  public anotherMenu = false;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getRoutes(events: any) {
    const splitVal = events.url.split('/');
    this.common.base.next(splitVal[1]);
    this.common.page.next(splitVal[2]);
    this.common.last.next(splitVal[3]);
    console.log('base', this.base);
    console.log('page', this.page);
    console.log('last', this.last);
    if (
      events.url.split('/')[2] === 'developer' ||
      events.url.split('/')[2] === 'developer-details' ||
      events.url.split('/')[2] === 'company-profile'
    ) {
      this.anotherMenu = true;
    } else {
      this.anotherMenu = false;
    }
  }
}
