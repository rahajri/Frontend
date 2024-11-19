import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PriceEmployeeComponent } from './price-employee.component';

const routes: Routes = [{ path: '', component: PriceEmployeeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PriceEmployeeRoutingModule { }
