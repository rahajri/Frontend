import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WithdrawMoneyComponent } from './withdraw-money.component';

const routes: Routes = [{ path: '', component: WithdrawMoneyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WithdrawMoneyRoutingModule { }
