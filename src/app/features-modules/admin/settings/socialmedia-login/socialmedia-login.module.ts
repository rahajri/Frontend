import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialmediaLoginRoutingModule } from './socialmedia-login-routing.module';
import { SocialmediaLoginComponent } from './socialmedia-login.component';


@NgModule({
  declarations: [
    SocialmediaLoginComponent
  ],
  imports: [
    CommonModule,
    SocialmediaLoginRoutingModule
  ]
})
export class SocialmediaLoginModule { }
