import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WithdrawRoutingModule } from './withdraw-routing.module';
import { WithdrawComponent } from './withdraw.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    WithdrawComponent
  ],
  imports: [
    CommonModule,
    WithdrawRoutingModule,
    SharedModule
]
})
export class WithdrawModule { }
