import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectEmployerViewProposalComponent } from './project-employer-view-proposal.component';

const routes: Routes = [{ path: '', component: ProjectEmployerViewProposalComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectEmployerViewProposalRoutingModule { }
