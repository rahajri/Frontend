import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpiredProjectRoutingModule } from './expired-project-routing.module';
import { ExpiredProjectComponent } from './expired-project.component';


@NgModule({
  declarations: [
    ExpiredProjectComponent
  ],
  imports: [
    CommonModule,
    ExpiredProjectRoutingModule
  ]
})
export class ExpiredProjectModule { }
