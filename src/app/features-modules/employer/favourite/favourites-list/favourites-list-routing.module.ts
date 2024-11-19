import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavouritesListComponent } from './favourites-list.component';

const routes: Routes = [{ path: '', component: FavouritesListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavouritesListRoutingModule { }
