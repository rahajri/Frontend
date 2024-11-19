import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FreelancerRoutingModule } from './freelancer-routing.module';
import { FreelancerComponent } from './freelancer.component';
import { FreelancerheaderComponent } from '../common/freelancerheader/freelancerheader.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';


@NgModule({
  declarations: [
    FreelancerComponent,
    FreelancerheaderComponent,
    SidemenuComponent
  ],
  imports: [
    CommonModule,
    FreelancerRoutingModule
  ]
})
export class FreelancerModule { }
