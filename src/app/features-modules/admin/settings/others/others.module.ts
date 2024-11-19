import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OthersRoutingModule } from './others-routing.module';
import { OthersComponent } from './others.component';
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OthersComponent
  ],
  imports: [
    CommonModule,
    OthersRoutingModule,
    NgxEditorModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class OthersModule { }
