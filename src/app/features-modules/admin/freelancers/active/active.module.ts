import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActiveRoutingModule } from './active-routing.module';
import { ActiveComponent } from './active.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ActiveComponent
  ],
  imports: [
    CommonModule,
    ActiveRoutingModule,
    SharedModule
]
})
export class ActiveModule { }
