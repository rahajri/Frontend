import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminGuard, AuthenticateGuard } from 'src/app/core/guard/guard.index';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'dashboard',
        canActivate: [AuthenticateGuard],
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./categories/categories.module').then(
            (m) => m.CategoriesModule
          ),
      },
      {
        path: 'freelancers',
        loadChildren: () =>
          import('./freelancers/freelancers.module').then(
            (m) => m.FreelancersModule
          ),
      },
      {
        path: 'deposit',
        loadChildren: () =>
          import('./deposit/deposit.module').then((m) => m.DepositModule),
      },
      {
        path: 'projects',
        canActivate: [AuthenticateGuard],
        loadChildren: () =>
          import('./projects/projects.module').then((m) => m.ProjectsModule),
      },
      {
        path: 'withdrawn',
        loadChildren: () =>
          import('./withdrawn/withdrawn.module').then((m) => m.WithdrawnModule),
      },
      {
        path: 'transaction',
        loadChildren: () =>
          import('./transaction/transaction.module').then(
            (m) => m.TransactionModule
          ),
      },
      {
        path: 'providers',
        loadChildren: () =>
          import('./providers/providers.module').then((m) => m.ProvidersModule),
      },
      {
        path: 'subscription',
        loadChildren: () =>
          import('./subscription/subscription.module').then(
            (m) => m.SubscriptionModule
          ),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./reports/reports.module').then((m) => m.ReportsModule),
      },
      {
        path: 'roles',
        loadChildren: () =>
          import('./roles/roles.module').then((m) => m.RolesModule),
      },
      {
        path: 'skills',
        loadChildren: () =>
          import('./skills/skills.module').then((m) => m.SkillsModule),
      },
      {
        path: 'verifyidentity',
        canActivate: [AuthenticateGuard],
        loadChildren: () =>
          import('./verifyidentity/verifyidentity.module').then(
            (m) => m.VerifyidentityModule
          ),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
      },
      {
        path: 'components',
        loadChildren: () =>
          import('./compnents/compnents.module').then((m) => m.CompnentsModule),
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./forms/forms.module').then((m) => m.FormsModule),
      },
      {
        path: 'tables',
        loadChildren: () =>
          import('./tables/tables.module').then((m) => m.TablesModule),
      },
      {
        path: 'role-permission',
        loadChildren: () =>
          import('./role/role-permission/role-permission.module').then(
            (m) => m.RolePermissionModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'company/:id',
        canActivate: [AuthenticateGuard],
        loadChildren: () =>
          import('./company/company.module').then((m) => m.CompanyModule),
      },
      {
        path: 'candidat/:id',
        canActivate: [AuthenticateGuard],
        loadChildren: () =>
          import('./candidate/candidate.module').then((m) => m.CandidateModule),
      },
      {
        path: 'providers/:id',
        canActivate: [AuthenticateGuard],
        loadChildren: () =>
          import('./offer/offer.module').then((m) => m.OfferModule),
      },
      {
        path: 'views',
        loadChildren: () =>
          import('./views/views.module').then((m) => m.ViewsModule),
      },
      {
        path: 'user-transactions',
        loadChildren: () =>
          import(
            './user-profiles/user-transactions/user-transactions.module'
          ).then((m) => m.UserTransactionsModule),
      },
      {
        path: 'activities',
        loadChildren: () =>
          import('./user-profiles/activities/activities.module').then(
            (m) => m.ActivitiesModule
          ),
      },
      {
        path: 'user-profile',
        loadChildren: () =>
          import('./user-profiles/user-profile/user-profile.module').then(
            (m) => m.UserProfileModule
          ),
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
