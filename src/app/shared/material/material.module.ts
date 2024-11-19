import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
@NgModule({
  imports: [MatButtonModule, MatSlideToggleModule],
  exports: [MatButtonModule, MatSlideToggleModule],
  providers: [],
})
export class MaterialModule {}
