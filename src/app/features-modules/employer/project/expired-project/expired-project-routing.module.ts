import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpiredProjectComponent } from './expired-project.component';

const routes: Routes = [{ path: '', component: ExpiredProjectComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpiredProjectRoutingModule { }
