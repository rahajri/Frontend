import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { header } from 'src/app/core/models/sidebar-model';
import { CommonService } from 'src/app/core/services/common/common.service';
import { NavbarService } from 'src/app/core/services/navbar.service';

@Component({
  selector: 'app-home-four-header',
  templateUrl: './home-four-header.component.html',
  styleUrls: ['./home-four-header.component.scss'],
})
export class HomeFourHeaderComponent {
  public routes = routes;
  public searchIcon = false;
  menuElement!: ElementRef;
  navbar: Array<header> = [];
  sticky = false;
  elementPosition!: string;
  base = '';
  page = '';
  last = '';
  constructor(
    private data: ShareDataService,
    private navservices: NavbarService,
    private common: CommonService,
    private router: Router
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
  public toggleSidebar(): void {
    this.navservices.openSidebar();
  }
  public hideSidebar(): void {
    this.navservices.closeSidebar();
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    if (windowScroll == 0) {
      this.sticky = false;
    } else {
      this.sticky = true;
    }
  }
  toggleSearch(){
    this.searchIcon = !this.searchIcon;
  }

}
