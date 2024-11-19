import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionComponent } from './transaction.component';

const routes: Routes = [
  { 
    path: '', 
    component: TransactionComponent,
    children: [
      { 
        path: 'all', 
      loadChildren: () => import('./all/all.module').then(m => m.AllModule) 
    }, 
      { 
        path: 'deposit', 
      loadChildren: () => import('./deposit/deposit.module').then(m => m.DepositModule) 
    }, 
      { path: 'withdraw', 
      loadChildren: () => import('./withdraw/withdraw.module').then(m => m.WithdrawModule) 
    }, 
      { 
        path: 'pending', 
      loadChildren: () => import('./pending/pending.module').then(m => m.PendingModule) 
    }, 
      { 
        path: 'onhold', 
      loadChildren: () => import('./onhold/onhold.module').then(m => m.OnholdModule) 
    }, 
      { 
        path: 'completed', 
      loadChildren: () => import('./completed/completed.module').then(m => m.CompletedModule)
    }
    ] }, 
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
