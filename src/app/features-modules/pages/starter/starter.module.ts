import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StarterRoutingModule } from './starter-routing.module';
import { StarterComponent } from './starter.component';


@NgModule({
  declarations: [
    StarterComponent
  ],
  imports: [
    CommonModule,
    StarterRoutingModule
  ]
})
export class StarterModule { }
