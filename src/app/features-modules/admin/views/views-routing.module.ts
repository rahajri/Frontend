import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewsComponent } from './views.component';

const routes: Routes = [
  { path: '', 
  component: ViewsComponent,
  children: [
    { 
      path: 'estimate', 
    loadChildren: () => import('./estimate/estimate.module').then((m) => m.EstimateModule) 
  }, 
    { 
      path: 'invoice', 
    loadChildren: () => import('./invoice/invoice.module').then((m) => m.InvoiceModule) 
  }, 
    { 
      path: 'price-employee', 
    loadChildren: () => import('./price-employee/price-employee.module').then((m) => m.PriceEmployeeModule) 
  },
    { 
      path: 'price-freelance', 
    loadChildren: () => import('./price-freelance/price-freelance.module').then((m) => m.PriceFreelanceModule) 
  }
  ] 
}, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
