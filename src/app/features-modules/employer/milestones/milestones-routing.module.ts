import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MilestonesComponent } from './milestones.component';

const routes: Routes = [
  { 
    path: '', 
    component: MilestonesComponent,
    children: [
      { 
        path: 'overviews', 
        loadChildren: () => import('./overviews/overviews.module').then(m => m.OverviewsModule) 
      }, 
      { 
        path: 'tasks', 
        loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule)
       }, 
      { 
        path: 'files', 
        loadChildren: () => import('./files/files.module').then(m => m.FilesModule) 
      }, 
      { 
        path: 'payments', 
        loadChildren: () => import('./payments/payments.module').then(m => m.PaymentsModule) 
      }, 
      { 
        path: 'milestone', 
        loadChildren: () => import('./milestone/milestone.module').then(m => m.MilestoneModule) 
      }
  ] }, ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MilestonesRoutingModule { }
