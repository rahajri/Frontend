import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepositRoutingModule } from './deposit-routing.module';
import { DepositComponent } from './deposit.component';


@NgModule({
  declarations: [
    DepositComponent
  ],
  imports: [
    CommonModule,
    DepositRoutingModule
  ]
})
export class DepositModule { }
