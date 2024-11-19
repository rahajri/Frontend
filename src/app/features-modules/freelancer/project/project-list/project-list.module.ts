import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectListRoutingModule } from './project-list-routing.module';
import { ProjectListComponent } from './project-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ProjectListComponent
  ],
  imports: [
    CommonModule,
    ProjectListRoutingModule,
    SharedModule
  ]
})
export class ProjectListModule { }
