import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompletdProjectViewDetailsRoutingModule } from './completd-project-view-details-routing.module';
import { CompletdProjectViewDetailsComponent } from './completd-project-view-details.component';


@NgModule({
  declarations: [
    CompletdProjectViewDetailsComponent
  ],
  imports: [
    CommonModule,
    CompletdProjectViewDetailsRoutingModule
  ]
})
export class CompletdProjectViewDetailsModule { }
