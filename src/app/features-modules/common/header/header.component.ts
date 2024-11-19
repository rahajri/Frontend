import {
  Component,
  ElementRef,
  HostListener,
  
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { header } from 'src/app/core/models/sidebar-model';
import { CommonService } from 'src/app/core/services/common/common.service';
import { NavbarService } from 'src/app/core/services/navbar.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  {
  @ViewChild('stickyMenu')
  menuElement!: ElementRef;
public routes = routes
  sticky = false;
  elementPosition: number | undefined;
  base="";
  base1="";
  page="";
  last = '';
   
  navbar: Array<header> = [];
  public header_bg = false;
  constructor(
    private Router: Router,
    private data :ShareDataService,
    private navservices : NavbarService,
    private common : CommonService
     ) {
      this.common.base.subscribe((res:string)=>{
        this.base =res;
        this.base1 =res;
      })
      this.common.page.subscribe((res:string)=>{
        this.page =res;
      })
      this.common.last.subscribe((res:string)=>{
        this.last =res;
      })
    this.navbar = this.data.sideBar;
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
  home() {
    this.Router.navigate(['/home']);
  }
  public toggleSidebar(): void {
    this.navservices.openSidebar();
  }
  public hideSidebar(): void {
    this.navservices.closeSidebar();
  }
  
  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    if (this.elementPosition && windowScroll >= this.elementPosition) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
    if (windowScroll == 0) {
      this.header_bg = false;
    } else {
      this.header_bg = true;
    }
  }

}
