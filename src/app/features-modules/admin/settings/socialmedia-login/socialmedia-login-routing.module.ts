import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SocialmediaLoginComponent } from './socialmedia-login.component';

const routes: Routes = [{ path: '', component: SocialmediaLoginComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialmediaLoginRoutingModule { }
