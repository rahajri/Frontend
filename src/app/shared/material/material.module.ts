import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
@NgModule({
  imports: [
    MatButtonModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatPaginatorModule,
  ],
  exports: [
    MatMenuModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatPaginatorModule,
  ],
  providers: [],
})
export class MaterialModule {}
