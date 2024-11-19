import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeveloperDetailsComponent } from './developer-details.component';

const routes: Routes = [{ path: '', component: DeveloperDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeveloperDetailsRoutingModule { }
