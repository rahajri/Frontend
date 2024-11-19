import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnboardEmployerRoutingModule } from './onboard-employer-routing.module';
import { OnboardEmployerComponent } from './onboard-employer.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    OnboardEmployerComponent
  ],
  imports: [
    CommonModule,
    OnboardEmployerRoutingModule,
    SharedModule,
  ]
})
export class OnboardEmployerModule { }
