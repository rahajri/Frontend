import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FreelancerListComponent } from './freelancer-list.component';

const routes: Routes = [{ path: '', component: FreelancerListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FreelancerListRoutingModule { }
