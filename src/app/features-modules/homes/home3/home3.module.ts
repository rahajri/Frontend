import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Home3RoutingModule } from './home3-routing.module';
import { Home3Component } from './home3.component';
import { HomeThreeHeaderComponent } from './components/home-three-header/home-three-header.component';
import { HomeThreeFooterComponent } from './components/home-three-footer/home-three-footer.component';
import {  CarouselModule } from 'ngx-owl-carousel-o';
import { SharedModule } from 'src/app/shared/shared.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';


@NgModule({
  declarations: [
    Home3Component,
    HomeThreeHeaderComponent,
    HomeThreeFooterComponent
  ],
  imports: [
    CommonModule,
    Home3RoutingModule,
    CarouselModule,
    SharedModule,
    SlickCarouselModule,
  ]
})
export class Home3Module { }
