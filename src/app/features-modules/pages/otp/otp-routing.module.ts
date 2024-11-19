import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtpComponent } from './otp.component';

const routes: Routes = [{ path: '', component: OtpComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtpRoutingModule { }
