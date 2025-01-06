import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { Profile, url } from 'src/app/core/models/models';
import { header } from 'src/app/core/models/sidebar-model';
import { CommonService } from 'src/app/core/services/common/common.service';
import { NavbarService } from 'src/app/core/services/navbar.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from '../../auth/service/user.service';

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
  profileName: string = '';

  navbar: Array<header> = [];

  constructor(
    private router: Router,
    private data: ShareDataService,
    private navservices: NavbarService,
    private common: CommonService,
    private authService: AuthService,
    private userService: UserService
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
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getRoutes(this.router);
      }
    });
    this.navbar = this.data.sideBar;
  }

  ngOnInit(): void {
    this.getUser();
    this.isLogged = this.authService.isLogged();
    this.isEmployer = this.authService.isEmployer();
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
      events.url.split('/')[2] === 'project-details' ||
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
