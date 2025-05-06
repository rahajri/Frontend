import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features-modules/features-modules.module').then(
        (m) => m.FeaturesModulesModule
      ),
  },
  {
    path: 'reset-password',
    loadChildren: () =>
      import(
        './features-modules/pages/reset-password/reset-password.module'
      ).then((m) => m.ResetPasswordModule),
  },

  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
