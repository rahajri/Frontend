import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FreelancerProfileComponent } from './freelancer-profile.component';

const routes: Routes = [{ path: '', component: FreelancerProfileComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FreelancerProfileRoutingModule { }
