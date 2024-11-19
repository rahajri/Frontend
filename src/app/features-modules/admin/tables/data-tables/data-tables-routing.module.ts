import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataTablesComponent } from './data-tables.component';

const routes: Routes = [{ path: '', component: DataTablesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataTablesRoutingModule { }
