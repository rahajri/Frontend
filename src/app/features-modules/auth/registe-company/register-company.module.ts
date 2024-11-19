import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

 import { SharedModule } from 'src/app/shared/shared.module';
 import { TranslateModule } from '@ngx-translate/core';
import { RegisterCompanyComponent } from './register-company.component';
import { RegisterCompanyRoutingModule } from './register-company-routing.module';


@NgModule({
  declarations: [
    RegisterCompanyComponent
  ],
  imports: [
    CommonModule,
    RegisterCompanyRoutingModule,
    SharedModule,
    TranslateModule
  ]
})
export class RegisterCompanyModule { }
