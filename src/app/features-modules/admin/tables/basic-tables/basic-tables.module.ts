import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicTablesRoutingModule } from './basic-tables-routing.module';
import { BasicTablesComponent } from './basic-tables.component';


@NgModule({
  declarations: [
    BasicTablesComponent
  ],
  imports: [
    CommonModule,
    BasicTablesRoutingModule
  ]
})
export class BasicTablesModule { }
