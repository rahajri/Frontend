import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvitedfavouritesRoutingModule } from './invitedfavourites-routing.module';
import { InvitedfavouritesComponent } from './invitedfavourites.component';


@NgModule({
  declarations: [
    InvitedfavouritesComponent
  ],
  imports: [
    CommonModule,
    InvitedfavouritesRoutingModule
  ]
})
export class InvitedfavouritesModule { }
