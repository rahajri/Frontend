import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputGroupsComponent } from './input-groups.component';

const routes: Routes = [{ path: '', component: InputGroupsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InputGroupsRoutingModule { }
