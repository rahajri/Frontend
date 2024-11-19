import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompletedProjectsRoutingModule } from './completed-projects-routing.module';
import { CompletedProjectsComponent } from './completed-projects.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CompletedProjectsComponent
  ],
  imports: [
    CommonModule,
    CompletedProjectsRoutingModule,
    SharedModule
  ]
})
export class CompletedProjectsModule { }
