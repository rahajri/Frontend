import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FreelancerRoutingModule } from './freelancer-routing.module';
import { FreelancerComponent } from './freelancer.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    FreelancerComponent
  ],
  imports: [
    CommonModule,
    FreelancerRoutingModule,
    SharedModule
]
})
export class FreelancerModule { }
