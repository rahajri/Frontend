import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserTransactionsRoutingModule } from './user-transactions-routing.module';
import { UserTransactionsComponent } from './user-transactions.component';



@NgModule({
  declarations: [
    UserTransactionsComponent
  ],
  imports: [
    CommonModule,
    UserTransactionsRoutingModule,
]
})
export class UserTransactionsModule { }
