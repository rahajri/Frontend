import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FreelancersRoutingModule } from './freelancers-routing.module';
import { FreelancersComponent } from './freelancers.component';



@NgModule({
  declarations: [
    FreelancersComponent
  ],
  imports: [
    CommonModule,
    FreelancersRoutingModule,
    
  ]
})
export class FreelancersModule { }
