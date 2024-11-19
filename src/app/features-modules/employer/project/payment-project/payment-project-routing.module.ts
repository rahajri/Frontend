import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentProjectComponent } from './payment-project.component';

const routes: Routes = [{ path: '', component: PaymentProjectComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentProjectRoutingModule { }
