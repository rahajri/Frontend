import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployerRoutingModule } from './employer-routing.module';
import { EmployerComponent } from './employer.component';
import { EmployerheaderComponent } from '../common/employerheader/employerheader.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';


@NgModule({
  declarations: [
    EmployerComponent,
    EmployerheaderComponent,
    SidemenuComponent
  ],
  imports: [
    CommonModule,
    EmployerRoutingModule
  ]
})
export class EmployerModule { }
