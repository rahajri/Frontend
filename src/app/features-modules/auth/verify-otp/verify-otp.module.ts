import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  VerifyOtpComponent } from './verify-otp.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { VerifyOtpRoutingModule } from './verify-otp-routing.module';


@NgModule({
  declarations: [
    VerifyOtpComponent,
  ],
  imports: [
    CommonModule,
    VerifyOtpRoutingModule,
    SharedModule,
    TranslateModule,

  ]
})
export class VerifyOtpModule { }
