import { Component } from '@angular/core';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { CommonService } from 'src/app/core/services/common/common.service';
import { SidebarData } from 'src/app/core/models/models';
import { routes } from 'src/app/core/helpers/routes/routes';
import { FreelancerSidebarItem } from 'src/app/core/models/sidebar-model';

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
  base = '';
  page = '';
  last = '';
  currentroute = '';
  sidebar: SidebarData[] = [];
  constructor(
    private data: ShareDataService,
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
    this.menuItem = this.data.menuItem;
  }

  public menuItem: Array<FreelancerSidebarItem> = [];
  toggleSubMenu(menuItem: FreelancerSidebarItem): void {
    menuItem.expanded = !menuItem.expanded;
  }
}
