import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtpRoutingModule } from './otp-routing.module';
import { OtpComponent } from './otp.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    OtpComponent
  ],
  imports: [
    CommonModule,
    OtpRoutingModule,
    SharedModule
  ]
})
export class OtpModule { }
