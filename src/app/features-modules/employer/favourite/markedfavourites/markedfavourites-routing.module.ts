import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarkedfavouritesComponent } from './markedfavourites.component';

const routes: Routes = [{ path: '', component: MarkedfavouritesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarkedfavouritesRoutingModule { }
