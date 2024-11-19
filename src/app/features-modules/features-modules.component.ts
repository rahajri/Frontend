import { Component, HostListener } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { NavbarService } from 'src/app/core/services/navbar.service';
import { CommonService } from '../core/services/common/common.service';
import { SideBarService } from '../core/services/side-bar/side-bar.service';
import { SpinnerService } from '../core/services/spinner/spinner.service';

@Component({
  selector: 'app-features-modules',
  templateUrl: './features-modules.component.html',
  styleUrls: ['./features-modules.component.scss'],
})
export class FeaturesModulesComponent {
  chat = false;
  home2 = false;
  home3 = false;
  home4 = false;
  home5 = false;
  public strokeValue = 0;
  public progress = 0;

  showMiniSidebar = false;
  public isuserHeader = false;
  public isFooter = false;
  public authenticated = false;
  public miniSidebar = false;
  public expandMenu = false;
  public mobileSidebar = false;
  base = '';
  page = '';
  last = '';
  url!: string;
  constructor(
    private Router: Router,
    private navservice: NavbarService,
    private common: CommonService,
    private sideBar: SideBarService,
    private data: ShareDataService,
    private spinner: SpinnerService
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
        localStorage.removeItem('sidebarPosition');
        this.mobileSidebar = false;
      }
      if (event instanceof NavigationEnd) {
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

    this.Router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        const URL = event.url.split('/');
        this.page = URL[1];

        this.spinner.show();
      }
      if (event instanceof NavigationEnd) {
        this.spinner.hide();
      }
    });

    this.Router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.spinner.show();
      }
      if (event instanceof NavigationEnd) {
        this.spinner.hide();
      }
    });
  }

  public toggleMobileSideBar(): void {
    this.sideBar.switchMobileSideBarPosition();
  }
  getRoutes(event: Router | NavigationStart) {
    const splitVal = event.url.split('/');
    this.common.base.next(splitVal[1]);
    this.common.page.next(splitVal[2]);
    this.common.last.next(splitVal[3]);
    if (
      this.base === 'home2' ||
      this.base === 'home3' ||
      this.base === 'home4' ||
      this.base === 'home5' ||
      this.base === 'admin' ||
      this.page === 'message' ||
      this.page === 'chats' ||
      this.page === 'onboard-employer' ||
      this.page === 'onboard-screen'
      // this.page === 'login'||
      // this.page === 'register'||
      // this.page === 'forgot-password'||
      // this.page === 'change-password'
    ) {
      this.isuserHeader = false;
      this.isFooter = false;
    } else {
      this.isuserHeader = true;
      this.isFooter = true;
    }
    if (localStorage.getItem('LoginData')) {
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }
  }

  public scrollToTop(): void {
    window.scrollTo(0, 0);
  }
  public isButtonOpen = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    this.isButtonOpen = scrollPosition > 100;
  }
}
