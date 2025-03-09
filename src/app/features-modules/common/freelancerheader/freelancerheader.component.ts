import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { url } from 'src/app/core/models/models';
import { header } from 'src/app/core/models/sidebar-model';
import { CommonService } from 'src/app/core/services/common/common.service';
import { NavbarService } from 'src/app/core/services/navbar.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from '../../auth/service/user.service';
import { environment } from 'src/environments/environment';
import { ProfileService } from 'src/app/core/services/profile.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-freelancerheader',
  templateUrl: './freelancerheader.component.html',
  styleUrls: ['./freelancerheader.component.scss'],
})
export class FreelancerheaderComponent implements OnInit {
  base = '';
  page = '';
  last = '';
  isLogged = false;
  isEmployer = false;
  public routes = routes;
  profile: any | null = null;
  initials: string = '';
  imgUrl: string = '';
  baseUrl = environment.apiUrl;
  profileName: string = '';
  subscription: Subscription | null = null;

  navbar: Array<header> = [];

  constructor(
    private router: Router,
    private data: ShareDataService,
    private navservices: NavbarService,
    private common: CommonService,
    private authService: AuthService,
    private userService: UserService,
    private profileService: ProfileService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getRoutes(this.router);
      }
    });
    this.navbar = this.data.sideBar;
  }

  ngOnInit(): void {
    this.subscription = this.profileService.currentUserProfile$.subscribe(
      (profile) => {
        this.profile = profile;
        if (profile && profile.image !== null) {
          this.imgUrl = this.baseUrl + profile.image;
          const { fullName, initials } =
            this.userService.getProfileDetails(profile);
          this.profileName = fullName;
          this.initials = initials;
        }
      }
    );
    this.getUser();
    this.isLogged = this.authService.isAuthenticated;
    this.isEmployer = this.authService.isEmployer();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe(); // Clean up the subscription
    }
  }

  getUser(): void {
    this.userService.getProfile().subscribe({
      next: (profile) => {
        this.profile = profile;
        if (profile.image !== null) {
          this.imgUrl = this.baseUrl + profile.image;
        }
        const { fullName, initials } = this.userService.getProfileDetails(
          this.profile
        );
        this.profileName = fullName;
        this.initials = initials;
      },
      error: (err) => console.error(err),
    });
  }

  employer() {
    localStorage.setItem('employer', 'employer');
  }
  freelancer() {
    localStorage.setItem('freelancer', 'freelancer');
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

  public getRoutes(events: url) {
    const splitVal = events.url.split('/');
    this.common.base.next(splitVal[1]);
    this.common.page.next(splitVal[2]);
    this.common.last.next(splitVal[3]);
    if (
      events.url.split('/')[2] === 'project' ||
      events.url.split('/')[2] === 'developer-profile'
    ) {
      this.anotherMenu = true;
    } else {
      this.anotherMenu = false;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate([this.routes.login]);
  }
}
