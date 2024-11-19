import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdentifyComponent } from './identify.component';

const routes: Routes = [{ path: '', component: IdentifyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdentifyRoutingModule { }
