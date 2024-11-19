import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteAccountRoutingModule } from './delete-account-routing.module';
import { DeleteAccountComponent } from './delete-account.component';


@NgModule({
  declarations: [
    DeleteAccountComponent
  ],
  imports: [
    CommonModule,
    DeleteAccountRoutingModule
  ]
})
export class DeleteAccountModule { }
