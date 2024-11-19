import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesComponent } from './invoices.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    InvoicesComponent
  ],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    NgApexchartsModule,
    SharedModule
]
})
export class InvoicesModule { }
