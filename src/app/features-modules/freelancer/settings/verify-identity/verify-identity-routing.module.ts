import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifyIdentityComponent } from './verify-identity.component';

const routes: Routes = [{ path: '', component: VerifyIdentityComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerifyIdentityRoutingModule { }
