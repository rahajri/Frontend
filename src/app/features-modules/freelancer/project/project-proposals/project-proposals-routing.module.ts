import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectProposalsComponent } from './project-proposals.component';

const routes: Routes = [{ path: '', component: ProjectProposalsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectProposalsRoutingModule { }
