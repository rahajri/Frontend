import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnholdComponent } from './onhold.component';

const routes: Routes = [{ path: '', component: OnholdComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnholdRoutingModule { }
