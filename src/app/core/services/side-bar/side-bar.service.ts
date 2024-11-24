 import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface MainMenu {
  menu: MenuItem[];
}

interface MenuItem {
  menuValue: string;
  showSubRoute: boolean;  
}

@Injectable({
  providedIn: 'root',
})
export class SideBarService {

  private readonly baseUrl = `${environment.apiUrl}/notifications`; // Use the environment variable


  public toggleSideBar: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('isMiniSidebar') ||  "false"
  );

  public toggleMobileSideBar: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('isMobileSidebar') || "false"
  );

  public expandSideBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public layoutPosition: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('layoutPosition') || '1'
  );
  public layoutDirection: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('layoutDirection')|| 'ltr'
  );

  constructor(private data: ShareDataService,
    private http: HttpClient
    ) {
    if(localStorage.getItem('layoutDirection')){
      this.layoutDirection.next('rtl')
    }
  }

  public switchSideMenuPosition(): void {
    if (localStorage.getItem('isMiniSidebar')) {
      this.toggleSideBar.next("false");
      localStorage.removeItem('isMiniSidebar');
      this.data.Admin_sideBar.map((mainMenus: MainMenu ) => {
        mainMenus.menu.map((resMenu: MenuItem) => {
          const menuValue = sessionStorage.getItem('menuValue');
          if (menuValue && menuValue == resMenu.menuValue) {
            resMenu.showSubRoute = true;
          }
        });
      });
    } else {
      this.toggleSideBar.next('true');
      localStorage.setItem('isMiniSidebar', 'true');
      this.data.Admin_sideBar.map((mainMenus: MainMenu) => {
        mainMenus.menu.map((resMenu: MenuItem) => {
          resMenu.showSubRoute = false;
        });
      });
    }
  }

  public switchMobileSideBarPosition(): void {
    if (localStorage.getItem('isMobileSidebar')) {
      this.toggleMobileSideBar.next('false');
      localStorage.removeItem('isMobileSidebar',);
    } else {
      this.toggleMobileSideBar.next('true');
      localStorage.setItem('isMobileSidebar', 'true');
    }
  }

  public changeLayout(position: string): void {
    this.layoutPosition.next(position);
    localStorage.setItem('layoutPosition', position);
  }

  getNotifications(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found!');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<any>(this.baseUrl, { headers });
  }
 
}
