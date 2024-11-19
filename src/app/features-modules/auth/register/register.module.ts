import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    SharedModule,
    TranslateModule,
  ]
})
export class RegisterModule { }
