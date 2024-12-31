import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
@NgModule({
  imports: [MatButtonModule, MatSlideToggleModule, MatPaginatorModule],
  exports: [MatButtonModule, MatSlideToggleModule, MatPaginatorModule],
  providers: [],
})
export class MaterialModule {}
