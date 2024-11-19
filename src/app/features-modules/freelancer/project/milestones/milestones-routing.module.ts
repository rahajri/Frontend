import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MilestonesComponent } from './milestones.component';

const routes: Routes = [{ path: '', component: MilestonesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MilestonesRoutingModule { }
