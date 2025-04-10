import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MachingComponent } from './maching.component';

const routes: Routes = [{ path: '', component: MachingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MachingRoutingModule {}
