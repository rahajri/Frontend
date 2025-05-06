import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewRoutingModule } from './review-routing.module';
import { ReviewComponent } from './review.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ReviewComponent],
  imports: [CommonModule, ReviewRoutingModule, SharedModule],
})
export class ReviewModule {}
