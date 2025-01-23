import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FreelancersRoutingModule } from './freelancers-routing.module';
import { FreelancersComponent } from './freelancers.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [FreelancersComponent],
  imports: [CommonModule, FreelancersRoutingModule, SharedModule],
})
export class FreelancersModule {}
