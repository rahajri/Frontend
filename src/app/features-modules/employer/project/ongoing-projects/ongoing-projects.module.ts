import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OngoingProjectsRoutingModule } from './ongoing-projects-routing.module';
import { OngoingProjectsComponent } from './ongoing-projects.component';


@NgModule({
  declarations: [
    OngoingProjectsComponent
  ],
  imports: [
    CommonModule,
    OngoingProjectsRoutingModule
  ]
})
export class OngoingProjectsModule { }
