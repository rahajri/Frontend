import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectEmployerViewProposalRoutingModule } from './project-employer-view-proposal-routing.module';
import { ProjectEmployerViewProposalComponent } from './project-employer-view-proposal.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ProjectEmployerViewProposalComponent],
  imports: [
    CommonModule,
    ProjectEmployerViewProposalRoutingModule,
    SharedModule,
  ],
})
export class ProjectEmployerViewProposalModule {}
