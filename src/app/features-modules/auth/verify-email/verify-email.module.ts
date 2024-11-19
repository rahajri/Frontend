import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyEmailComponent } from './verify-email.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { VerifyEmailRoutingModule } from './verify-email-routing.module';


@NgModule({
  declarations: [
    VerifyEmailComponent,
  ],
  imports: [
    CommonModule,
    VerifyEmailRoutingModule,
    SharedModule,
    TranslateModule,

  ]
})
export class VerifyEmailModule { }
