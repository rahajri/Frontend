import { Component } from '@angular/core';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { CommonService } from 'src/app/core/services/common/common.service';
import { Profile, SidebarData } from 'src/app/core/models/models';
import { routes } from 'src/app/core/helpers/routes/routes';
import { FreelancerSidebarItem } from 'src/app/core/models/sidebar-model';
import { UserService } from '../../auth/service/user.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Router } from '@angular/router';

export interface SidemenuItem {
  page: string;
  icon: string;
  menuValue: string;
  separateRoute: boolean;
  showAsTab: boolean;
  showSubRoute: boolean;
  submenu: string;
  expanded: boolean;
  title?: string;
  routes?: boolean;
}

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent {
  public routes = routes;
  profile: Profile | null = null;
  profileName: string = '';
  initials: string = '';
  base = '';
  page = '';
  last = '';
  currentroute = '';
  sidebar: SidebarData[] = [];
  constructor(
    private router: Router,
    private data: ShareDataService,
    private common: CommonService,
    private userService: UserService,
    private authService: AuthService
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
    this.menuItem = this.data.menuItem;
  }
  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.userService.getProfile().subscribe({
      next: (profile) => {
        this.profile = profile;
        const { fullName, initials } =
          this.userService.getProfileDetails(profile);
        this.profileName = fullName;
        this.initials = initials;
      },
      error: (err) => console.error('Error fetching profile:', err),
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate([routes.home]);
  }

  public menuItem: Array<FreelancerSidebarItem> = [];
  toggleSubMenu(menuItem: FreelancerSidebarItem): void {
    menuItem.expanded = !menuItem.expanded;
  }
}
