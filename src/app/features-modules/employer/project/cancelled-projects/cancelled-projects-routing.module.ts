import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CancelledProjectsComponent } from './cancelled-projects.component';

const routes: Routes = [{ path: '', component: CancelledProjectsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CancelledProjectsRoutingModule { }
