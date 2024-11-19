import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InactiveRoutingModule } from './inactive-routing.module';
import { InactiveComponent } from './inactive.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    InactiveComponent
  ],
  imports: [
    CommonModule,
    InactiveRoutingModule,
    SharedModule
]
})
export class InactiveModule { }
