import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { CandidateRoutingModule } from './candidate-routing.module';
import { CandidateComponent } from './candidate.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CandidateComponent],
  imports: [CommonModule, CandidateRoutingModule, SharedModule],
  providers: [DatePipe],
})
export class CandidateModule {}
