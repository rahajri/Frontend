import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    children: [
      {
        path: 'projects',
        loadChildren: () =>
          import('./projects/projects.module').then((m) => m.ProjectsModule),
      },
      {
        path: 'bidding',
        loadChildren: () =>
          import('./bidding/bidding.module').then((m) => m.BiddingModule),
      },
      {
        path: 'invoices',
        loadChildren: () =>
          import('./invoices/invoices.module').then((m) => m.InvoicesModule),
      },
      {
        path: 'earnings',
        loadChildren: () =>
          import('./earnings/earnings.module').then((m) => m.EarningsModule),
      },
      {
        path: 'employer',
        loadChildren: () =>
          import('./employer/employer.module').then((m) => m.EmployerModule),
      },
      {
        path: 'freelancer',
        loadChildren: () =>
          import('./freelancer/freelancer.module').then(
            (m) => m.FreelancerModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
