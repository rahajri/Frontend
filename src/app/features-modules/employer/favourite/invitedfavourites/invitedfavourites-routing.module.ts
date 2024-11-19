import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvitedfavouritesComponent } from './invitedfavourites.component';

const routes: Routes = [{ path: '', component: InvitedfavouritesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvitedfavouritesRoutingModule { }
