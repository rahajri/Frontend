import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormValidationRoutingModule } from './form-validation-routing.module';
import { FormValidationComponent } from './form-validation.component';


@NgModule({
  declarations: [
    FormValidationComponent
  ],
  imports: [
    CommonModule,
    FormValidationRoutingModule
  ]
})
export class FormValidationModule { }
