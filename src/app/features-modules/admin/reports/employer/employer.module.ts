import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployerRoutingModule } from './employer-routing.module';
import { EmployerComponent } from './employer.component';
import { NgApexchartsModule } from 'ng-apexcharts';



@NgModule({
  declarations: [
    EmployerComponent
  ],
  imports: [
    CommonModule,
    EmployerRoutingModule,
    NgApexchartsModule
]
})
export class EmployerModule { }
