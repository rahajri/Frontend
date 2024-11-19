import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SociallinksRoutingModule } from './sociallinks-routing.module';
import { SociallinksComponent } from './sociallinks.component';


@NgModule({
  declarations: [
    SociallinksComponent
  ],
  imports: [
    CommonModule,
    SociallinksRoutingModule
  ]
})
export class SociallinksModule { }
