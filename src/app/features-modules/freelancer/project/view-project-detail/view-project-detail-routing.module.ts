import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewProjectDetailComponent } from './view-project-detail.component';

const routes: Routes = [{ path: '', component: ViewProjectDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewProjectDetailRoutingModule { }
