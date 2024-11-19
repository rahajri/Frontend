import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FreelancerFavouritesRoutingModule } from './freelancer-favourites-routing.module';
import { FreelancerFavouritesComponent } from './freelancer-favourites.component';


@NgModule({
  declarations: [
    FreelancerFavouritesComponent
  ],
  imports: [
    CommonModule,
    FreelancerFavouritesRoutingModule
  ]
})
export class FreelancerFavouritesModule { }
