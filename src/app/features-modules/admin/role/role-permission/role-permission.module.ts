import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolePermissionRoutingModule } from './role-permission-routing.module';
import { RolePermissionComponent } from './role-permission.component';


@NgModule({
  declarations: [
    RolePermissionComponent
  ],
  imports: [
    CommonModule,
    RolePermissionRoutingModule
  ]
})
export class RolePermissionModule { }
