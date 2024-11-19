import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FreelancerInvitationsRoutingModule } from './freelancer-invitations-routing.module';
import { FreelancerInvitationsComponent } from './freelancer-invitations.component';


@NgModule({
  declarations: [
    FreelancerInvitationsComponent
  ],
  imports: [
    CommonModule,
    FreelancerInvitationsRoutingModule
  ]
})
export class FreelancerInvitationsModule { }
