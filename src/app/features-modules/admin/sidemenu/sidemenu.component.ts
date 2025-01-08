import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { AdminSidebar } from 'src/app/core/models/sidebar-model';

import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CommonService } from 'src/app/core/services/common/common.service';
import { SideBarService } from 'src/app/core/services/side-bar/side-bar.service';
import { Profile } from 'src/app/core/models/models';
import { UserService } from '../../auth/service/user.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent implements OnInit {
  base = '';
  page = '';
  last = '';
  public miniSidebar = false;
  currentroute = '';
  side_bar_data: AdminSidebar[] = [];
  notifications: any[] = [];
  unreadCount: number = 0;
  profileName = '';
  profile: Profile | null = null;
  initials: string = '';

  constructor(
    public router: Router,
    private data: ShareDataService,
    private sideBar: SideBarService,
    private common: CommonService,
    private userService: UserService,
    public auth: AuthService
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

    // get sidebar data as observable because data is controlled for design to expand submenus

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.data.getAdminSideBarData.subscribe((res: any) => {
      this.side_bar_data = res;
    });
    this.sideBar.toggleSideBar.subscribe((res) => {
      if (res == 'true') {
        this.miniSidebar = true;
      } else {
        this.miniSidebar = false;
      }
    });
  }
  ngOnInit(): void {
    this.fetchNotifications();
    this.getUser();
  }

  public toggleSideBar(): void {
    this.sideBar.switchSideMenuPosition();
  }
  public toggleMobileSideBar(): void {
    this.sideBar.switchMobileSideBarPosition();
  }

  Logout(): void {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
  public miniSideBarMouseHover(position: string): void {
    if (position == 'over') {
      this.sideBar.expandSideBar.next(true);
    } else {
      this.sideBar.expandSideBar.next(false);
    }
  }

  public expandSubMenus(menu: {
    menuValue: string;
    showSubRoute: boolean;
  }): void {
    sessionStorage.setItem('menuValue', menu.menuValue);
    this.side_bar_data.map((mainMenus) => {
      mainMenus.menu.map(
        (resMenu: { menuValue: string; showSubRoute: boolean }) => {
          // collapse other submenus which are open
          if (resMenu.menuValue == menu.menuValue) {
            menu.showSubRoute = !menu.showSubRoute;
            if (menu.showSubRoute == false) {
              sessionStorage.removeItem('menuValue');
            }
          } else {
            resMenu.showSubRoute = false;
          }
        }
      );
    });
  }

  getUser(): void {
    this.userService.getProfile().subscribe({
      next: (profile) => {
        this.profile = profile;
        const { fullName, initials } = this.userService.getProfileDetails(
          this.profile
        );
        this.profileName = fullName;
        this.initials = initials;
      },
      error: (err) => console.error(err),
    });
  }

  public logOut(): void {
    this.auth.logout();
  }
  miniSideBarBlur(position: string) {
    if (position === 'over') {
      this.sideBar.expandSideBar.next(true);
    } else {
      this.sideBar.expandSideBar.next(false);
    }
  }

  miniSideBarFocus(position: string) {
    if (position === 'over') {
      this.sideBar.expandSideBar.next(true);
    } else {
      this.sideBar.expandSideBar.next(false);
    }
  }

  fetchNotifications(): void {
    this.sideBar.getNotifications().subscribe(
      (data) => {
        this.unreadCount = data.unreadCount;
        this.notifications = data?.notifications?.map((notification: any) => ({
          title: notification.title,
          timeAgo: this.calculateTimeAgo(notification.createdAt),
        }));
      },
      (error) => {
        console.error('Error fetching notifications:', error);
      }
    );
  }

  private calculateTimeAgo(createdAt: Date): string {
    const diff = Math.floor(
      (new Date().getTime() - new Date(createdAt).getTime()) / 1000
    );
    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  }
}
