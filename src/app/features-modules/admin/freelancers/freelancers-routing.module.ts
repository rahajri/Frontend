import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FreelancersComponent } from './freelancers.component';

const routes: Routes = [
  { path: '', 
  component: FreelancersComponent,
  children: [
    { 
      path: 'all', 
    loadChildren: () => import('./all/all.module').then(m => m.AllModule) 
  }, 
    { 
      path: 'active', 
    loadChildren: () => import('./active/active.module').then(m => m.ActiveModule) 
  }, 
    { 
      path: 'inactive', 
    loadChildren: () => import('./inactive/inactive.module').then(m => m.InactiveModule) 
  }, 
    { 
      path: 'suspended', 
    loadChildren: () => import('./suspended/suspended.module').then(m => m.SuspendedModule) 
  }, 
    { 
      path: 'administrator', 
    loadChildren: () => import('./administrator/administrator.module').then(m => m.AdministratorModule) 
  }
  ] },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FreelancersRoutingModule { }
