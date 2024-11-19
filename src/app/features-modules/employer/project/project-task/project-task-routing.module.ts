import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectTaskComponent } from './project-task.component';

const routes: Routes = [{ path: '', component: ProjectTaskComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectTaskRoutingModule { }
