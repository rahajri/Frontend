import { Component, ElementRef, HostListener } from '@angular/core';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { header } from 'src/app/core/models/sidebar-model';
import { CommonService } from 'src/app/core/services/common/common.service';
import { NavbarService } from 'src/app/core/services/navbar.service';
interface data {
  value: string;
}
@Component({
  selector: 'app-home-two-header',
  templateUrl: './home-two-header.component.html',
  styleUrls: ['./home-two-header.component.scss'],
})
export class HomeTwoHeaderComponent {
  menuElement!: ElementRef;
  public header_bg = false;
  public routes = routes;
  topHeader = true;
  navbar: Array<header> = [];
  public selectedValue = '';
  selectedList: data[] = [
    { value: 'Categories' },
    { value: 'Video & Animation' },
    { value: 'Music & Audio' },
    { value: 'Writing & Translation' },
    { value: 'Digital Marketing' },
    { value: 'Design & Creative' },
    { value: 'Development & IT' },
  ];
  sticky = false;
  elementPosition!: string;
  base = '';
  page = '';
  last = '';
  constructor(
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

  closeTopHeader() {
    this.topHeader = !this.topHeader;
  }
}
