import { Component, AfterViewChecked } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import { LightGallery } from 'lightgallery/lightgallery';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements AfterViewChecked {
  public routes = routes;
  private lightGallery!: LightGallery;
  private needRefresh = false;
  settings = {
    counter: false,
    plugins: [lgZoom, lgVideo],
  };
  ngAfterViewChecked(): void {
    if (this.needRefresh) {
      this.lightGallery.refresh();
      this.needRefresh = false;
    }
  }
  onInit = (detail: { instance: LightGallery }): void => {
    this.lightGallery = detail.instance;
  };
  onBeforeSlide = (detail: BeforeSlideDetail): void => {
     
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { index, prevIndex } = detail;
  };
  public onlineList: OwlOptions = {
    margin: 0,
    nav: false,
    loop: false,
    dots: false,
    autoplaySpeed: 2000,
    responsive: {
      0: {
        items: 5,
      },
      768: {
        items: 5,
      },
      1170: {
        items: 5,
      },
    },
  };
  public showSearch = false;
  search2 = false;
  userInfo = true;
  mobChat1 = false;

  closeButton() {
    this.showSearch = false;
  }
  showSearch2() {
    this.search2 = true;
  }
  hideSearch2() {
    this.search2 = false;
  }
  hideUserDetail() {
    this.userInfo = false;
    const isResponsive = window.matchMedia('(max-width: 992px)').matches;
    if (isResponsive) {
      this.mobChat1 = false;
    }
  }
  showUserDetail() {
    this.userInfo = true;
    const isResponsive = window.matchMedia('(max-width: 992px)').matches;
    if (isResponsive) {
      this.mobChat1 = true;
    }
  }
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === 'Space') {
      // Handle the key press here, e.g., trigger the same action as the click event
      this.hideSearch2();
    }
  }
 
}
