import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewRoutingModule } from './review-routing.module';
import { ReviewComponent } from './review.component';


@NgModule({
  declarations: [
    ReviewComponent
  ],
  imports: [
    CommonModule,
    ReviewRoutingModule
  ]
})
export class ReviewModule { }
