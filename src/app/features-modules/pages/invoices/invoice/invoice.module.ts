import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceComponent } from './invoice.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';



@NgModule({ declarations: [
        InvoiceComponent
    ], imports: [CommonModule,
        InvoiceRoutingModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class InvoiceModule { }
