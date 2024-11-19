import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerticalFormRoutingModule } from './vertical-form-routing.module';
import { VerticalFormComponent } from './vertical-form.component';


@NgModule({
  declarations: [
    VerticalFormComponent
  ],
  imports: [
    CommonModule,
    VerticalFormRoutingModule
  ]
})
export class VerticalFormModule { }
