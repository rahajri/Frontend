import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnboardEmployerComponent } from './onboard-employer.component';

const routes: Routes = [{ path: '', component: OnboardEmployerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardEmployerRoutingModule { }
