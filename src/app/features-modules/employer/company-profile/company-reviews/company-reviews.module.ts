import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyReviewsRoutingModule } from './company-reviews-routing.module';
import { CompanyReviewsComponent } from './company-reviews.component';


@NgModule({
  declarations: [
    CompanyReviewsComponent
  ],
  imports: [
    CommonModule,
    CompanyReviewsRoutingModule
  ]
})
export class CompanyReviewsModule { }
