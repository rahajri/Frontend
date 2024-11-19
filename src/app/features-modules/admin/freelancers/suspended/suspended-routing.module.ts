import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuspendedComponent } from './suspended.component';

const routes: Routes = [{ path: '', component: SuspendedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuspendedRoutingModule { }
