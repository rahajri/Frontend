import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceNewRoutingModule } from './invoice-new-routing.module';
import { InvoiceNewComponent } from './invoice-new.component';


@NgModule({
  declarations: [
    InvoiceNewComponent
  ],
  imports: [
    CommonModule,
    InvoiceNewRoutingModule
  ]
})
export class InvoiceNewModule { }
