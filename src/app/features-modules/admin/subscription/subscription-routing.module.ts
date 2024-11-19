import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscriptionComponent } from './subscription.component';

const routes: Routes = [
  { path: '', 
  component: SubscriptionComponent,
  children: [
    { path: 'employer', loadChildren: () => import('./employer/employer.module').then(m => m.EmployerModule) }, 
    { path: 'freelancer', loadChildren: () => import('./freelancer/freelancer.module').then(m => m.FreelancerModule) }
  ] }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionRoutingModule { }
