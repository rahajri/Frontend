import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CancelledProjectsRoutingModule } from './cancelled-projects-routing.module';
import { CancelledProjectsComponent } from './cancelled-projects.component';


@NgModule({
  declarations: [
    CancelledProjectsComponent
  ],
  imports: [
    CommonModule,
    CancelledProjectsRoutingModule
  ]
})
export class CancelledProjectsModule { }
