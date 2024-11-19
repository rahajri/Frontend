import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyReviewsComponent } from './company-reviews.component';

const routes: Routes = [{ path: '', component: CompanyReviewsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyReviewsRoutingModule { }
