import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompletedProjectFilesRoutingModule } from './completed-project-files-routing.module';
import { CompletedProjectFilesComponent } from './completed-project-files.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CompletedProjectFilesComponent
  ],
  imports: [
    CommonModule,
    CompletedProjectFilesRoutingModule,
    SharedModule
  ]
})
export class CompletedProjectFilesModule { }
