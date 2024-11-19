import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WithdrawnRoutingModule } from './withdrawn-routing.module';
import { WithdrawnComponent } from './withdrawn.component';


@NgModule({
  declarations: [
    WithdrawnComponent
  ],
  imports: [
    CommonModule,
    WithdrawnRoutingModule
  ]
})
export class WithdrawnModule { }
