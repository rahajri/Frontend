import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectProposalsRoutingModule } from './project-proposals-routing.module';
import { ProjectProposalsComponent } from './project-proposals.component';


@NgModule({
  declarations: [
    ProjectProposalsComponent
  ],
  imports: [
    CommonModule,
    ProjectProposalsRoutingModule
  ]
})
export class ProjectProposalsModule { }
