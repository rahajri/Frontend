import { Component, ElementRef, HostListener } from '@angular/core';
import { NavigationStart, Router, Event as RouterEvent } from '@angular/router';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { header } from 'src/app/core/models/sidebar-model';
import { NavbarService } from 'src/app/core/services/navbar.service';
interface data {
  value: string;
}
@Component({
  selector: 'app-home-five-header',
  templateUrl: './home-five-header.component.html',
  styleUrls: ['./home-five-header.component.scss'],
})
export class HomeFiveHeaderComponent {
  public routes = routes;
  public searchIcon = false;
  menuElement!: ElementRef;
  navbar: Array<header> = [];
  sticky = false;
  elementPosition!: string;
  base = '';
  page = '';
  constructor(
    private Router: Router,
    private navservices: NavbarService,
    private data: ShareDataService
  ) {
    this.Router.events.subscribe((data: RouterEvent) => {
      if (data instanceof NavigationStart) {
        this.base = data.url.split('/')[1];
      }
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
    { value: 'Music & Audio' },
    { value: 'Writing & Translation' },
    { value: 'Digital Marketing' },
    { value: 'Design & Creative' },
    { value: 'Development & IT' },
  ];
  toggleSearch() {
    this.searchIcon = !this.searchIcon;
  }
}
