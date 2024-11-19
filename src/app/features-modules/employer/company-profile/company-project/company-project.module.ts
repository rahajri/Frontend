import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyProjectRoutingModule } from './company-project-routing.module';
import { CompanyProjectComponent } from './company-project.component';


@NgModule({
  declarations: [
    CompanyProjectComponent
  ],
  imports: [
    CommonModule,
    CompanyProjectRoutingModule
  ]
})
export class CompanyProjectModule { }
