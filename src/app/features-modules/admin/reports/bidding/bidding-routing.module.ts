import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BiddingComponent } from './bidding.component';

const routes: Routes = [{ path: '', component: BiddingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BiddingRoutingModule { }
