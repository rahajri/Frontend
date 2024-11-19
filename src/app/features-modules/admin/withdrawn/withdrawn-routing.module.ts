import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WithdrawnComponent } from './withdrawn.component';

const routes: Routes = [
  { 
    path: '', 
    component: WithdrawnComponent,
  children: [
    { 
      path: 'history', 
      loadChildren: () => import('./history/history.module').then(m => m.HistoryModule) 
    }, 
    { 
      path: 'pending', 
      loadChildren: () => import('./pending/pending.module').then(m => m.PendingModule) 
    }, 
    { 
      path: 'cancelled', 
      loadChildren: () => import('./cancelled/cancelled.module').then(m => m.CancelledModule) 
    }, 
    { 
      path: 'completed', 
      loadChildren: () => import('./completed/completed.module').then(m => m.CompletedModule) 
    }
  ] }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WithdrawnRoutingModule { }
