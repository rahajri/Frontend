import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavouritesListRoutingModule } from './favourites-list-routing.module';
import { FavouritesListComponent } from './favourites-list.component';


@NgModule({
  declarations: [
    FavouritesListComponent
  ],
  imports: [
    CommonModule,
    FavouritesListRoutingModule
  ]
})
export class FavouritesListModule { }
