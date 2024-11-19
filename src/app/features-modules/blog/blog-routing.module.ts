import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';

const routes: Routes = [
  { path: '', 
  component: BlogComponent,
  children: [
    { 
      
      path: 'list', 
      loadChildren: () => import('./list/list.module').then(m => m.ListModule) 
    }, 
    { 
      path: 'grid', 
      loadChildren: () => import('./grid/grid.module').then(m => m.GridModule) 
    }, 
    { 
      path: 'details', 
      loadChildren: () => import('./details/details.module').then(m => m.DetailsModule) 
    }
  ] }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
