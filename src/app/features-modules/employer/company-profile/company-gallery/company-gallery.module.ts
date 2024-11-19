import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyGalleryRoutingModule } from './company-gallery-routing.module';
import { CompanyGalleryComponent } from './company-gallery.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CompanyGalleryComponent
  ],
  imports: [
    CommonModule,
    CompanyGalleryRoutingModule,
    SharedModule
  ]
})
export class CompanyGalleryModule { }
