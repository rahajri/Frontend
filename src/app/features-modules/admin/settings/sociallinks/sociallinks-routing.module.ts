import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SociallinksComponent } from './sociallinks.component';

const routes: Routes = [{ path: '', component: SociallinksComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SociallinksRoutingModule { }
