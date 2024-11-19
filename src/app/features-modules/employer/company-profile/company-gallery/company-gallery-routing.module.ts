import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyGalleryComponent } from './company-gallery.component';

const routes: Routes = [{ path: '', component: CompanyGalleryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyGalleryRoutingModule { }
