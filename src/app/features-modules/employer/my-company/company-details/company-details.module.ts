import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyDetailsRoutingModule } from './company-details-routing.module';
import { CompanyDetailsComponent } from './company-details.component';


@NgModule({
  declarations: [
    CompanyDetailsComponent
  ],
  imports: [
    CommonModule,
    CompanyDetailsRoutingModule
  ]
})
export class CompanyDetailsModule { }
