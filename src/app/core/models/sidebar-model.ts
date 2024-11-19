export interface header {
  tittle: string;
  base?: string;
  base1?: string;
  showAsTab: boolean;
  separateRoute: boolean;
  route?: string;
  menu: menu[];
}
export interface menu {
  menuValue: string;
  img?: string;
  route?: string;
  hasSubRoute: boolean;
  showSubRoute: boolean;
  page?: string;
  last?: string;
  base?: string;
  subMenus: subMenus[];
}
export interface subMenus {
  menuValue: string;
  route: string;
  hasSubRoute: boolean;
  showSubRoute: boolean;
  base: string;
  page: string;
  last: string;
  subMenus: [];
}
export interface FreelancerSidebarItem {
  title: string;
  icon: string;
  hasSubRoute: boolean;
  routes?: string;
  page?: string;
  page1?: string;
  page2?: string;
  page3?: string;
  page4?: string;
  page5?: string;
  submenu?: FreelancerSubmenu[];
  expanded?: boolean;
}

export interface FreelancerSubmenu {
  title: string;
  routes: string;
  page: string;
}

export interface AdminSubMenu {
  menuValue: string;
  route: string;
  base: string;
}

export interface AdminMenuItem {
  icon: string;
  menuValue: string;
  route: string;
  hasSubRoute: boolean;
  showSubRoute: boolean;
  base?: string;
  base2?: string;
  base3?: string;
  base4?: string;
  base5?: string;
  base6?: string;
  subMenus: AdminSubMenu[]
}

export interface AdminSidebar {
  tittle: string;
  icon: string;
  showAsTab: boolean;
  separateRoute: boolean;
  menu: AdminMenuItem[];
}
