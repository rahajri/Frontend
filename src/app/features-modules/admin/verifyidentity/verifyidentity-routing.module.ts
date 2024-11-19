import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifyidentityComponent } from './verifyidentity.component';

const routes: Routes = [{ path: '', component: VerifyidentityComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerifyidentityRoutingModule { }
