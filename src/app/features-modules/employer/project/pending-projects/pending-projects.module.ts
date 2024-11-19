import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingProjectsRoutingModule } from './pending-projects-routing.module';
import { PendingProjectsComponent } from './pending-projects.component';


@NgModule({
  declarations: [
    PendingProjectsComponent,
  ],
  imports: [
    CommonModule,
    PendingProjectsRoutingModule
  ]
})
export class PendingProjectsModule { }
