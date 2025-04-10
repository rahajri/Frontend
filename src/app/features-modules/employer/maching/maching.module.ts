import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MachingRoutingModule } from './maching-routing.module';
import { MachingComponent } from './maching.component';

@NgModule({
  declarations: [MachingComponent],
  imports: [CommonModule, MachingRoutingModule, SharedModule],
})
export class MachingModule {}
