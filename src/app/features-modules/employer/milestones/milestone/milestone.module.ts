import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MilestoneRoutingModule } from './milestone-routing.module';
import { MilestoneComponent } from './milestone.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    MilestoneComponent
  ],
  imports: [
    CommonModule,
    MilestoneRoutingModule,
    SharedModule
    
  ]
})
export class MilestoneModule { }
