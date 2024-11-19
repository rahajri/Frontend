import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstimateComponent } from './estimate.component';

const routes: Routes = [{ path: '', component: EstimateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstimateRoutingModule { }
