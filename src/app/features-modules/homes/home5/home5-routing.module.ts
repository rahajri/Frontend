import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home5Component } from './home5.component';

const routes: Routes = [{ path: '', component: Home5Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Home5RoutingModule { }
