import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicTablesComponent } from './basic-tables.component';

const routes: Routes = [{ path: '', component: BasicTablesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicTablesRoutingModule { }
