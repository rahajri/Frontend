import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfferRoutingModule } from './offer-routing.module';
import { OfferComponent } from './offer.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [OfferComponent],
  imports: [CommonModule, OfferRoutingModule, SharedModule],
})
export class OfferModule {}
