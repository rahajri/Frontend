import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatementRoutingModule } from './statement-routing.module';
import { StatementComponent } from './statement.component';


@NgModule({
  declarations: [
    StatementComponent
  ],
  imports: [
    CommonModule,
    StatementRoutingModule
  ]
})
export class StatementModule { }
