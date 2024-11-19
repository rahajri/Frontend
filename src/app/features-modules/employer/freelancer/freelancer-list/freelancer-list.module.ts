import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FreelancerListRoutingModule } from './freelancer-list-routing.module';
import { FreelancerListComponent } from './freelancer-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    FreelancerListComponent
  ],
  imports: [
    CommonModule,
    FreelancerListRoutingModule,
    SharedModule
  ]
})
export class FreelancerListModule { }
