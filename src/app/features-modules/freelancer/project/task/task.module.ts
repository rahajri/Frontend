import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TaskComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    SharedModule
  ]
})
export class TaskModule { }
