import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HorizontalFormsComponent } from './horizontal-forms.component';

const routes: Routes = [{ path: '', component: HorizontalFormsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HorizontalFormsRoutingModule { }
