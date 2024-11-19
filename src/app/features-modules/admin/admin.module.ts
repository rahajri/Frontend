import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AdminComponent,
    SidemenuComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
