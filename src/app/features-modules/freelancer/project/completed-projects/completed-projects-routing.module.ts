import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompletedProjectsComponent } from './completed-projects.component';

const routes: Routes = [{ path: '', component: CompletedProjectsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompletedProjectsRoutingModule { }
