import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewProjectDetailsComponent } from './view-project-details.component';

const routes: Routes = [{ path: '', component: ViewProjectDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewProjectDetailsRoutingModule { }
