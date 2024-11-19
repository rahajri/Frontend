import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicInputsComponent } from './basic-inputs.component';

const routes: Routes = [{ path: '', component: BasicInputsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicInputsRoutingModule { }
