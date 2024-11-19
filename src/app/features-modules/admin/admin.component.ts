import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, NavigationStart, Router,Event as RouterEvent } from '@angular/router';
import * as feather from 'feather-icons';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { url } from 'src/app/core/models/models';
import { CommonService } from 'src/app/core/services/common/common.service';
import { NavbarService } from 'src/app/core/services/navbar.service';
import { SideBarService } from 'src/app/core/services/side-bar/side-bar.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminComponent implements AfterViewInit {
  base = '';
  page = '';
  last = '';
  public miniSidebar = false;
  public mobileSidebar = false;
  showMiniSidebar = false;
  public expandMenu = false;
  public isSidemenu = false;
  constructor(private Router: Router, private common: CommonService,private sideBar: SideBarService,private navservice: NavbarService,private data: ShareDataService,) {
    this.common.base.subscribe((base: string) => {
      this.base = base;
    });
    this.common.page.subscribe((page: string) => {
      this.page = page;
    });
    this.common.last.subscribe((last: string) => {
      this.last = last;
    });
    this.Router.events.subscribe((data: RouterEvent) => {
      if (data instanceof NavigationStart) {
        this.getRoutes(data);
        this.mobileSidebar = false;
        localStorage.removeItem('isMobileSidebar');
        localStorage.removeItem('sidebarPosition');
      }
      if (data instanceof NavigationEnd) {
        this.showMiniSidebar = false;
      }
    });
    this.getRoutes(this.Router);
    this.navservice.toogleSidebar.subscribe((res: string) => {
      if (res == 'true') {
        this.showMiniSidebar = true;
      } else {
        this.showMiniSidebar = false;
      }
    });

    // <* condition to check side bar position *>
    this.sideBar.toggleSideBar.subscribe((res: string) => {
      if (res == 'true') {
        this.miniSidebar = true;
      } else {
        this.miniSidebar = false;
      }
    });
    // <* condition to check side bar position *>

    // <* condition to check mobile side bar position *>
    this.sideBar.toggleMobileSideBar.subscribe((res: string) => {
      if (res == 'true' || res == 'true') {
        this.mobileSidebar = true;
      } else {
        this.mobileSidebar = false;
      }
    });
    // <* condition to check mobile side bar position *>

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.sideBar.expandSideBar.subscribe((res) => {
      this.expandMenu = res;
      // <* to collapse submenu while toggling side menu*>
      if (res == false && this.miniSidebar == true) {
        this.data.Admin_sideBar.map((mainMenus) => {
          mainMenus.menu.map((resMenu) => {
            resMenu.showSubRoute = false;
          });
        });
      }
      // <* to expand submenu while hover toggled side menu*>
      if (res == true && this.miniSidebar == true) {
        this.data.Admin_sideBar.map((mainMenus) => {
          mainMenus.menu.map((resMenu) => {
            const menuValue = sessionStorage.getItem('menuValue');
            if (menuValue && menuValue == resMenu.menuValue) {
              resMenu.showSubRoute = true;
            } else {
              resMenu.showSubRoute = false;
            }
          });
        });
      }
    });

  }
  ngAfterViewInit() {
    feather.replace();
  }
  getRoutes(events: url) {
    const splitVal = events.url.split('/');
    this.common.base.next(splitVal[1]);
    this.common.page.next(splitVal[2]);
    this.common.last.next(splitVal[3]);
  }
  
}
