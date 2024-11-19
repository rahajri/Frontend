import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MilestonesRoutingModule } from './milestones-routing.module';
import { MilestonesComponent } from './milestones.component';


@NgModule({
  declarations: [
    MilestonesComponent
  ],
  imports: [
    CommonModule,
    MilestonesRoutingModule
  ]
})
export class MilestonesModule { }
