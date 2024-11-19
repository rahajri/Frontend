import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OthersComponent } from './others.component';

const routes: Routes = [{ path: '', component: OthersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OthersRoutingModule { }
