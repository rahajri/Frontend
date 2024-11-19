import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveComponent } from './active.component';

const routes: Routes = [{ path: '', component: ActiveComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActiveRoutingModule { }
