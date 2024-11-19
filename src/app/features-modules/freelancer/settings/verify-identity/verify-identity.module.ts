import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerifyIdentityRoutingModule } from './verify-identity-routing.module';
import { VerifyIdentityComponent } from './verify-identity.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    VerifyIdentityComponent
  ],
  imports: [
    CommonModule,
    VerifyIdentityRoutingModule,
    SharedModule
  ]
})
export class VerifyIdentityModule { }
