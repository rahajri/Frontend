import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectMilestoneRoutingModule } from './project-milestone-routing.module';
import { ProjectMilestoneComponent } from './project-milestone.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ProjectMilestoneComponent
  ],
  imports: [
    CommonModule,
    ProjectMilestoneRoutingModule,
    SharedModule
  ]
})
export class ProjectMilestoneModule { }
