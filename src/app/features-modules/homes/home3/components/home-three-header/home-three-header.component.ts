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
  selector: 'app-home-three-header',
  templateUrl: './home-three-header.component.html',
  styleUrls: ['./home-three-header.component.scss'],
})
export class HomeThreeHeaderComponent {
  public routes = routes;
  menuElement!: ElementRef;
  navbar: Array<header> = [];
  topHeader = true;
  sticky = false;
  elementPosition!: string;
  public searchIcon = false;
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
  public selectedValue = '';

  selectedList: data[] = [
    { value: 'Categories' },
    { value: 'Video & Animation' },
    { value: 'Writing & Translation' },
    { value: 'Digital Marketing' },
    { value: 'Design & Creative' },
    { value: 'Development & IT' },
  ];
  closeTopHeader() {
    this.topHeader = !this.topHeader;
  }
  toggleSearch(){
    this.searchIcon = !this.searchIcon;
  }
}
