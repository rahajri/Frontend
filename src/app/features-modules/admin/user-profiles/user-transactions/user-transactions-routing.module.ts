import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTransactionsComponent } from './user-transactions.component';

const routes: Routes = [{ path: '', component: UserTransactionsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserTransactionsRoutingModule { }
