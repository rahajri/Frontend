import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentProjectRoutingModule } from './payment-project-routing.module';
import { PaymentProjectComponent } from './payment-project.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PaymentProjectComponent
  ],
  imports: [
    CommonModule,
    PaymentProjectRoutingModule,
    SharedModule
  ]
})
export class PaymentProjectModule { }
