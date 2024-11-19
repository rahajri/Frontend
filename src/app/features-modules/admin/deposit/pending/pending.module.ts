import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingRoutingModule } from './pending-routing.module';
import { PendingComponent } from './pending.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    PendingComponent
  ],
  imports: [
    CommonModule,
    PendingRoutingModule,
    SharedModule
    
]
})
export class PendingModule { }
