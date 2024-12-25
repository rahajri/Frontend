import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';
import { CommonService } from 'src/app/core/services/common/common.service';

@Component({
  selector: 'app-freelancers',
  templateUrl: './freelancers.component.html',
  styleUrls: ['./freelancers.component.scss'],
})
export class FreelancersComponent {
  public routes = routes;
  base = '';
  page = '';
  last = '';
  selectedHederTitle = 'Tous';
  public str2!: string;
  public str!: string;
  public filter = false;
  constructor(private common: CommonService, public router: Router) {
    this.common.base.subscribe((res: string) => {
      this.base = res;
    });
    this.common.page.subscribe((res: string) => {
      this.page = res;
    });
    this.common.last.subscribe((res: string) => {
      this.last = res;
      this.str = this.last;
      this.str2 = this.getTranslation(
        this.str.charAt(0).toUpperCase() + this.str.slice(1)
      );
    });
  }

  openFilter() {
    this.filter = !this.filter;
  }

  getTranslation(key: string): string {
    const translations: { [key: string]: string } = {
      All: 'Tous les',
      Active: 'Actifs',
      Inactive: 'Inactifs',
    };
    return translations[key] || key;
  }
}
