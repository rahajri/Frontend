import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverviewsRoutingModule } from './overviews-routing.module';
import { OverviewsComponent } from './overviews.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    OverviewsComponent
  ],
  imports: [
    CommonModule,
    OverviewsRoutingModule,
    SharedModule
  ]
})
export class OverviewsModule { }
