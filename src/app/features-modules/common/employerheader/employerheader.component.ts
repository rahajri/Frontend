import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { header } from 'src/app/core/models/sidebar-model';
import { CommonService } from 'src/app/core/services/common/common.service';
import { NavbarService } from 'src/app/core/services/navbar.service';
import { UserService } from '../../auth/service/user.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Profile } from 'src/app/core/models/models';

@Component({
  selector: 'app-employerheader',
  templateUrl: './employerheader.component.html',
  styleUrls: ['./employerheader.component.scss'],
})
export class EmployerheaderComponent {
  public routes = routes;
  base = '';
  page = '';
  last = '';
  profileName = '';
  profile: Profile | null = null;
  initials: string = '';
  isLogged = false;
  isEmployer = false;

  navbar: Array<header> = [];
  constructor(
    private router: Router,
    private data: ShareDataService,
    private navservices: NavbarService,
    private userService: UserService,
    private authService: AuthService,
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

  ngOnInit(): void {
    this.getUser();
    this.isLogged = this.authService.isLogged();
    this.isEmployer = this.authService.isEmployer();
  }

  logout() {
    this.authService.logout();
    this.router.navigate([routes.login]);
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
  setLocalStorage(value: string): void {
    localStorage.setItem(value, value);
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getRoutes(events: any) {
    const splitVal = events.url.split('/');
    this.common.base.next(splitVal[1]);
    this.common.page.next(splitVal[2]);
    this.common.last.next(splitVal[3]);
    if (
      events.url.split('/')[2] === 'developer' ||
      events.url.split('/')[2] === 'developer-details' ||
      events.url.split('/')[2] === 'company-profile'
    ) {
      this.anotherMenu = true;
    } else {
      this.anotherMenu = false;
    }
  }
}
