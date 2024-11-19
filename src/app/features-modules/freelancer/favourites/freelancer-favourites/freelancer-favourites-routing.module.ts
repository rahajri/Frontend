import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FreelancerFavouritesComponent } from './freelancer-favourites.component';

const routes: Routes = [{ path: '', component: FreelancerFavouritesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FreelancerFavouritesRoutingModule { }
