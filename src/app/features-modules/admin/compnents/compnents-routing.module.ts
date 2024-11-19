import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompnentsComponent } from './compnents.component';

const routes: Routes = [{ path: '', component: CompnentsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompnentsRoutingModule { }
