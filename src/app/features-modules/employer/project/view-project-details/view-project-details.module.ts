import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewProjectDetailsRoutingModule } from './view-project-details-routing.module';
import { ViewProjectDetailsComponent } from './view-project-details.component';


@NgModule({
  declarations: [
    ViewProjectDetailsComponent
  ],
  imports: [
    CommonModule,
    ViewProjectDetailsRoutingModule
  ]
})
export class ViewProjectDetailsModule { }
