import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Home4RoutingModule } from './home4-routing.module';
import { Home4Component } from './home4.component';
import { HomeFourHeaderComponent } from './components/home-four-header/home-four-header.component';
import { HomeFourFooterComponent } from './components/home-four-footer/home-four-footer.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    Home4Component,
    HomeFourHeaderComponent,
    HomeFourFooterComponent
  ],
  imports: [
    CommonModule,
    Home4RoutingModule,
    SlickCarouselModule,
    CarouselModule,
    SharedModule
  ]
})
export class Home4Module { }
