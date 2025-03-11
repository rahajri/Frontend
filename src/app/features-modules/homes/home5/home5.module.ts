import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Home5RoutingModule } from './home5-routing.module';
import { Home5Component } from './home5.component';
import { HomeFiveHeaderComponent } from './components/home-five-header/home-five-header.component';
import { HomeFiveFooterComponent } from './components/home-five-footer/home-five-footer.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SharedModule } from 'src/app/shared/shared.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [
    Home5Component,
    HomeFiveHeaderComponent,
    HomeFiveFooterComponent,
  ],
  imports: [
    CommonModule,
    Home5RoutingModule,
    CarouselModule,
    SharedModule,
    SlickCarouselModule,
  ],
})
export class Home5Module {}
