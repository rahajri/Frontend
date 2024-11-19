import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectTaskRoutingModule } from './project-task-routing.module';
import { ProjectTaskComponent } from './project-task.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ProjectTaskComponent
  ],
  imports: [
    CommonModule,
    ProjectTaskRoutingModule,
    SharedModule
  ]
})
export class ProjectTaskModule { }
