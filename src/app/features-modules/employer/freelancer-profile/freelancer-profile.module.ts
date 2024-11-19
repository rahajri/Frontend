import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FreelancerProfileRoutingModule } from './freelancer-profile-routing.module';
import { FreelancerProfileComponent } from './freelancer-profile.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    FreelancerProfileComponent
  ],
  imports: [
    CommonModule,
    FreelancerProfileRoutingModule,
    SharedModule
  ]
})
export class FreelancerProfileModule { }
