import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerticalFormComponent } from './vertical-form.component';

const routes: Routes = [{ path: '', component: VerticalFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerticalFormRoutingModule { }
