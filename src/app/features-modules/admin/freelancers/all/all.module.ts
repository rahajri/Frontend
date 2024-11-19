import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllRoutingModule } from './all-routing.module';
import { AllComponent } from './all.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    AllComponent
  ],
  imports: [
    CommonModule,
    AllRoutingModule,
    SharedModule
]
})
export class AllModule { }
