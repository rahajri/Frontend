import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OngoingProjectsComponent } from './ongoing-projects.component';

const routes: Routes = [{ path: '', component: OngoingProjectsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OngoingProjectsRoutingModule { }
