import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HorizontalFormsRoutingModule } from './horizontal-forms-routing.module';
import { HorizontalFormsComponent } from './horizontal-forms.component';


@NgModule({
  declarations: [
    HorizontalFormsComponent
  ],
  imports: [
    CommonModule,
    HorizontalFormsRoutingModule
  ]
})
export class HorizontalFormsModule { }
