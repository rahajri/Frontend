import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PriceEmployeeRoutingModule } from './price-employee-routing.module';
import { PriceEmployeeComponent } from './price-employee.component';


@NgModule({
  declarations: [
    PriceEmployeeComponent
  ],
  imports: [
    CommonModule,
    PriceEmployeeRoutingModule
  ]
})
export class PriceEmployeeModule { }
