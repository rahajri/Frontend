import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsDetailsRoutingModule } from './projects-details-routing.module';
import { ProjectsDetailsComponent } from './projects-details.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ProjectsDetailsComponent
  ],
  imports: [
    CommonModule,
    ProjectsDetailsRoutingModule,
    SharedModule
  ]
})
export class ProjectsDetailsModule { }
