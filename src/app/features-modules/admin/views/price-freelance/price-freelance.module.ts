import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PriceFreelanceRoutingModule } from './price-freelance-routing.module';
import { PriceFreelanceComponent } from './price-freelance.component';


@NgModule({
  declarations: [
    PriceFreelanceComponent
  ],
  imports: [
    CommonModule,
    PriceFreelanceRoutingModule
  ]
})
export class PriceFreelanceModule { }
