import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployerRoutingModule } from './employer-routing.module';
import { EmployerComponent } from './employer.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    EmployerComponent
  ],
  imports: [
    CommonModule,
    EmployerRoutingModule,
    SharedModule
]
})
export class EmployerModule { }
