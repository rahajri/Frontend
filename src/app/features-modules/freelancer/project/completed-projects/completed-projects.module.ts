import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompletedProjectsRoutingModule } from './completed-projects-routing.module';
import { CompletedProjectsComponent } from './completed-projects.component';


@NgModule({
  declarations: [
    CompletedProjectsComponent
  ],
  imports: [
    CommonModule,
    CompletedProjectsRoutingModule
  ]
})
export class CompletedProjectsModule { }
