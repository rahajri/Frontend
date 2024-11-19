import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvidersRoutingModule } from './providers-routing.module';
import { ProvidersComponent } from './providers.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ProvidersComponent
  ],
  imports: [
    CommonModule,
    ProvidersRoutingModule,
    SharedModule
]
})
export class ProvidersModule { }
