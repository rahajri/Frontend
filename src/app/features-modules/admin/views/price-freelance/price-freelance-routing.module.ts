import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PriceFreelanceComponent } from './price-freelance.component';

const routes: Routes = [{ path: '', component: PriceFreelanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PriceFreelanceRoutingModule { }
