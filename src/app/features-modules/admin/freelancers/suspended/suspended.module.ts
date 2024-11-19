import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuspendedRoutingModule } from './suspended-routing.module';
import { SuspendedComponent } from './suspended.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    SuspendedComponent
  ],
  imports: [
    CommonModule,
    SuspendedRoutingModule,
    SharedModule
]
})
export class SuspendedModule { }
