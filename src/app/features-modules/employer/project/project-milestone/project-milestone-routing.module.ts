import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectMilestoneComponent } from './project-milestone.component';

const routes: Routes = [{ path: '', component: ProjectMilestoneComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectMilestoneRoutingModule { }
