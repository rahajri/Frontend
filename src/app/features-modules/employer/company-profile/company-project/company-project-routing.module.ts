import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyProjectComponent } from './company-project.component';

const routes: Routes = [{ path: '', component: CompanyProjectComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyProjectRoutingModule { }
