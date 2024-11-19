import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepositRoutingModule } from './deposit-routing.module';
import { DepositComponent } from './deposit.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    DepositComponent
  ],
  imports: [
    CommonModule,
    DepositRoutingModule,
    SharedModule
]
})
export class DepositModule { }
