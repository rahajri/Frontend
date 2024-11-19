import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTablesRoutingModule } from './data-tables-routing.module';
import { DataTablesComponent } from './data-tables.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DataTablesComponent
  ],
  imports: [
    CommonModule,
    DataTablesRoutingModule,
    SharedModule
  ]
})
export class DataTablesModule { }
