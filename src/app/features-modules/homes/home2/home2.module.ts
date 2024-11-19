import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Home2RoutingModule } from './home2-routing.module';
import { Home2Component } from './home2.component';
import { HomeTwoHeaderComponent } from './components/home-two-header/home-two-header.component';
import { HomeTwoFooterComponent } from './components/home-two-footer/home-two-footer.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    Home2Component,
    HomeTwoHeaderComponent,
    HomeTwoFooterComponent
  ],
  imports: [
    CommonModule,
    Home2RoutingModule,
    CarouselModule,
    SharedModule
    
  ]
})
export class Home2Module { }
