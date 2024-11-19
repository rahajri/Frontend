import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicSettingsComponent } from './basic-settings.component';

const routes: Routes = [{ path: '', component: BasicSettingsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicSettingsRoutingModule { }
