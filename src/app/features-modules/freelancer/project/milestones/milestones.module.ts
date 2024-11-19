import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MilestonesRoutingModule } from './milestones-routing.module';
import { MilestonesComponent } from './milestones.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MilestonesComponent
  ],
  imports: [
    CommonModule,
    MilestonesRoutingModule,
    SharedModule
  ]
})
export class MilestonesModule { }
