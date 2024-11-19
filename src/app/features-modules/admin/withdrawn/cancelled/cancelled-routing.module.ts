import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CancelledComponent } from './cancelled.component';

const routes: Routes = [{ path: '', component: CancelledComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CancelledRoutingModule { }
