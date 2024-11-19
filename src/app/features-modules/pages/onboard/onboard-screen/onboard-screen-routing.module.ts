import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnboardScreenComponent } from './onboard-screen.component';

const routes: Routes = [{ path: '', component: OnboardScreenComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardScreenRoutingModule { }
