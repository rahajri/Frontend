import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingProjectsComponent } from './pending-projects.component';

const routes: Routes = [{ path: '', component: PendingProjectsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingProjectsRoutingModule { }
