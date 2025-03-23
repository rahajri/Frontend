import { Component, OnInit } from '@angular/core';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { CommonService } from 'src/app/core/services/common/common.service';
import { SidebarData } from 'src/app/core/models/models';
import { routes } from 'src/app/core/helpers/routes/routes';
import { FreelancerSidebarItem } from 'src/app/core/models/sidebar-model';
import { UserService } from '../../auth/service/user.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent implements OnInit {
  subscription: Subscription | null = null;
  public routes = routes;
  profile: any | null = null;
  initials: string = '';
  profileName: string = '';
  base = '';
  page = '';
  last = '';
  currentroute = '';
  isLogged = false;
  sidebar: SidebarData[] = [];
  constructor(
    private router: Router,
    private data: ShareDataService,
    private common: CommonService,
    private userService: UserService,
    private profileService: ProfileService,
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

    this.menuItems = this.data.freelancer_sidebar;
  }
  ngOnInit(): void {
    this.isLogged = this.authService.isAuthenticated;
    if (this.isLogged) {
      this.getUser();
    }
  }

  public menuItems: Array<FreelancerSidebarItem> = [];
  toggleSubMenu(menuItem: FreelancerSidebarItem): void {
    menuItem.expanded = !menuItem.expanded;
  }

  getUser(): void {
    this.subscription = this.profileService.currentUserProfile$.subscribe({
      next: (profile) => {
        if (profile) {
          this.profile = profile;
          const { fullName, initials } = this.userService.getProfileDetails(
            this.profile
          );
          this.profileName = fullName;
          this.initials = initials;
        }
      },
      error: (err) => console.error(err),
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe(); // Clean up the subscription
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate([routes.login]);
  }
}
