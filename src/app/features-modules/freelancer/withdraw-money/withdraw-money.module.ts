import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WithdrawMoneyRoutingModule } from './withdraw-money-routing.module';
import { WithdrawMoneyComponent } from './withdraw-money.component';


@NgModule({
  declarations: [
    WithdrawMoneyComponent
  ],
  imports: [
    CommonModule,
    WithdrawMoneyRoutingModule
  ]
})
export class WithdrawMoneyModule { }
