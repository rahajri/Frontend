import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BiddingRoutingModule } from './bidding-routing.module';
import { BiddingComponent } from './bidding.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    BiddingComponent
  ],
  imports: [
    CommonModule,
    BiddingRoutingModule,
    NgApexchartsModule,
    SharedModule
]
})
export class BiddingModule { }
