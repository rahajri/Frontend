import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FreelancerInvitationsComponent } from './freelancer-invitations.component';

const routes: Routes = [{ path: '', component: FreelancerInvitationsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FreelancerInvitationsRoutingModule { }
