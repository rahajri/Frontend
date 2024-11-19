import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllProjectsRoutingModule } from './all-projects-routing.module';
import { AllProjectsComponent } from './all-projects.component';




@NgModule({
  declarations: [
    AllProjectsComponent,

  ],
  imports: [
    CommonModule,
    AllProjectsRoutingModule,

  ]
})
export class AllProjectsModule { }
