import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerifyidentityRoutingModule } from './verifyidentity-routing.module';
import { VerifyidentityComponent } from './verifyidentity.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    VerifyidentityComponent
  ],
  imports: [
    CommonModule,
    VerifyidentityRoutingModule,SharedModule
]
})
export class VerifyidentityModule { }
