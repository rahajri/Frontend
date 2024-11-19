import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdentifyRoutingModule } from './identify-routing.module';
import { IdentifyComponent } from './identify.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    IdentifyComponent
  ],
  imports: [
    CommonModule,
    IdentifyRoutingModule,
    SharedModule
  ]
})
export class IdentifyModule { }
