import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompnentsRoutingModule } from './compnents-routing.module';
import { CompnentsComponent } from './compnents.component';


@NgModule({
  declarations: [
    CompnentsComponent
  ],
  imports: [
    CommonModule,
    CompnentsRoutingModule
  ]
})
export class CompnentsModule { }
