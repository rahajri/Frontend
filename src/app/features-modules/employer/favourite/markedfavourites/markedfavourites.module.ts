import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarkedfavouritesRoutingModule } from './markedfavourites-routing.module';
import { MarkedfavouritesComponent } from './markedfavourites.component';


@NgModule({
  declarations: [
    MarkedfavouritesComponent
  ],
  imports: [
    CommonModule,
    MarkedfavouritesRoutingModule
  ]
})
export class MarkedfavouritesModule { }
