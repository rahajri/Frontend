import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';





@NgModule({
  declarations: [
    TasksComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    SharedModule,
    HttpClientModule


  ]
})
export class TasksModule { }
