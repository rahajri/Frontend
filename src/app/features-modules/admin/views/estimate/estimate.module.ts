import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstimateRoutingModule } from './estimate-routing.module';
import { EstimateComponent } from './estimate.component';


@NgModule({
  declarations: [
    EstimateComponent
  ],
  imports: [
    CommonModule,
    EstimateRoutingModule
  ]
})
export class EstimateModule { }
