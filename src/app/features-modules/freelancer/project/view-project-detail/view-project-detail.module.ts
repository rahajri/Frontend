import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewProjectDetailRoutingModule } from './view-project-detail-routing.module';
import { ViewProjectDetailComponent } from './view-project-detail.component';


@NgModule({
  declarations: [
    ViewProjectDetailComponent
  ],
  imports: [
    CommonModule,
    ViewProjectDetailRoutingModule
  ]
})
export class ViewProjectDetailModule { }
