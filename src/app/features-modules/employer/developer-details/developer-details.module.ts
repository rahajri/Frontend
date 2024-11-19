import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeveloperDetailsRoutingModule } from './developer-details-routing.module';
import { DeveloperDetailsComponent } from './developer-details.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DeveloperDetailsComponent
  ],
  imports: [
    CommonModule,
    DeveloperDetailsRoutingModule,
    SharedModule
  ]
})
export class DeveloperDetailsModule { }
