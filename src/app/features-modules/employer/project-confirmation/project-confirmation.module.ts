import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectConfirmationRoutingModule } from './project-confirmation-routing.module';
import { ProjectConfirmationComponent } from './project-confirmation.component';


@NgModule({
  declarations: [
    ProjectConfirmationComponent
  ],
  imports: [
    CommonModule,
    ProjectConfirmationRoutingModule
  ]
})
export class ProjectConfirmationModule { }
