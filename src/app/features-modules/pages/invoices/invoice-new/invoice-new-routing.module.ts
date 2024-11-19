import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceNewComponent } from './invoice-new.component';

const routes: Routes = [{ path: '', component: InvoiceNewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceNewRoutingModule { }
