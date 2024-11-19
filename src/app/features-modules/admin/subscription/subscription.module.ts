import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionRoutingModule } from './subscription-routing.module';
import { SubscriptionComponent } from './subscription.component';


@NgModule({
  declarations: [
    SubscriptionComponent
  ],
  imports: [
    CommonModule,
    SubscriptionRoutingModule
  ]
})
export class SubscriptionModule { }
