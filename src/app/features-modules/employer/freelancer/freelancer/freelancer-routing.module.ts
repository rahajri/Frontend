import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FreelancerComponent } from './freelancer.component';

const routes: Routes = [{ path: '', component: FreelancerComponent }, { path: 'freelancer-list', loadChildren: () => import('../freelancer-list/freelancer-list.module').then(m => m.FreelancerListModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FreelancerRoutingModule { }
