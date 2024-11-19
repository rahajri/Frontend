import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicInputsRoutingModule } from './basic-inputs-routing.module';
import { BasicInputsComponent } from './basic-inputs.component';


@NgModule({
  declarations: [
    BasicInputsComponent
  ],
  imports: [
    CommonModule,
    BasicInputsRoutingModule
  ]
})
export class BasicInputsModule { }
