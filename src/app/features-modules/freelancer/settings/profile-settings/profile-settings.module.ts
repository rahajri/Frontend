import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ProfileSettingsRoutingModule } from './profile-settings-routing.module';
import { ProfileSettingsComponent } from './profile-settings.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ProfileSettingsComponent
  ],
  imports: [
    CommonModule,
    ProfileSettingsRoutingModule,
    SharedModule
  ],
  providers: [
    DatePipe,
  ]
})
export class ProfileSettingsModule { }
