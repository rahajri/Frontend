import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceComponent } from './invoice.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    InvoiceComponent
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    
    HttpClientModule
  ],
})
export class InvoiceModule { }
