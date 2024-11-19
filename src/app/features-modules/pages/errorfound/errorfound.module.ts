import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorfoundRoutingModule } from './errorfound-routing.module';
import { ErrorfoundComponent } from './errorfound.component';


@NgModule({
  declarations: [
    ErrorfoundComponent
  ],
  imports: [
    CommonModule,
    ErrorfoundRoutingModule
  ]
})
export class ErrorfoundModule { }
