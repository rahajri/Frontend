import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './history.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    HistoryComponent
  ],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    SharedModule
]
})
export class HistoryModule { }
