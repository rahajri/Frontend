import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompletedComponent } from './completed.component';

const routes: Routes = [{ path: '', component: CompletedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompletedRoutingModule { }
