import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MilestoneComponent } from './milestone.component';

const routes: Routes = [{ path: '', component: MilestoneComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MilestoneRoutingModule { }
