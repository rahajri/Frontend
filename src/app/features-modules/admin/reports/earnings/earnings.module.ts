import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EarningsRoutingModule } from './earnings-routing.module';
import { EarningsComponent } from './earnings.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    EarningsComponent
  ],
  imports: [
    CommonModule,
    EarningsRoutingModule,
    NgApexchartsModule,
    SharedModule
]
})
export class EarningsModule { }
