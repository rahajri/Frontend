import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnholdRoutingModule } from './onhold-routing.module';
import { OnholdComponent } from './onhold.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    OnholdComponent
  ],
  imports: [
    CommonModule,
    OnholdRoutingModule,
    SharedModule
]
})
export class OnholdModule { }
