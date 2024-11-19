import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorfoundComponent } from './errorfound.component';

const routes: Routes = [{ path: '', component: ErrorfoundComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorfoundRoutingModule { }
