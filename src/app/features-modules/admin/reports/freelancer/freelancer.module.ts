import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FreelancerRoutingModule } from './freelancer-routing.module';
import { FreelancerComponent } from './freelancer.component';
import { NgApexchartsModule } from 'ng-apexcharts';



@NgModule({
  declarations: [
    FreelancerComponent
  ],
  imports: [
    CommonModule,
    FreelancerRoutingModule,
    NgApexchartsModule
]
})
export class FreelancerModule { }
