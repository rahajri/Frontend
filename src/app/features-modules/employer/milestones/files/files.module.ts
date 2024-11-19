import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilesRoutingModule } from './files-routing.module';
import { FilesComponent } from './files.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    FilesComponent
  ],
  imports: [
    CommonModule,
    FilesRoutingModule,
    SharedModule
    
  ]
})
export class FilesModule { }
