import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablesComponent } from './tables.component';

const routes: Routes = [
  { 
    path: '', 
    component: TablesComponent,
    children: [
      { path: 'basic-tables', loadChildren: () => import('./basic-tables/basic-tables.module').then(m => m.BasicTablesModule) }, 
      { path: 'data-tables', loadChildren: () => import('./data-tables/data-tables.module').then(m => m.DataTablesModule) }
    ] },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablesRoutingModule { }
