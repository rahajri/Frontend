import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WithdrawComponent } from './withdraw.component';

const routes: Routes = [{ path: '', component: WithdrawComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WithdrawRoutingModule { }
