import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'about',
        loadChildren: () =>
          import('./about-us/about-us.module').then((m) => m.AboutUsModule),
      },
      {
        path: 'blank-page',
        loadChildren: () =>
          import('./starter/starter.module').then((m) => m.StarterModule),
      },
      {
        path: 'onboard-screen',
        loadChildren: () =>
          import('./onboard/onboard-screen/onboard-screen.module').then(
            (m) => m.OnboardScreenModule
          ),
      },
      {
        path: 'invoice',
        loadChildren: () =>
          import('./invoices/invoice/invoice.module').then(
            (m) => m.InvoiceModule
          ),
      },
      {
        path: 'view-invoice',
        loadChildren: () =>
          import('./invoices/invoice-new/invoice-new.module').then(
            (m) => m.InvoiceNewModule
          ),
      },
      {
        path: 'user-account-details',
        loadChildren: () =>
          import('./userdetails/userdetails.module').then(
            (m) => m.UserdetailsModule
          ),
      },
      {
        path: 'onboard-employer',
        loadChildren: () =>
          import('./onboard/onboard-employer/onboard-employer.module').then(
            (m) => m.OnboardEmployerModule
          ),
      },
      {
        path: 'term-condition',
        loadChildren: () =>
          import('./term-condition/term-condition.module').then(
            (m) => m.TermConditionModule
          ),
      },
      {
        path: 'privacy-policy',
        loadChildren: () =>
          import('./privacy-policy/privacy-policy.module').then(
            (m) => m.PrivacyPolicyModule
          ),
      },
      {
        path: 'otp',
        loadChildren: () => import('./otp/otp.module').then((m) => m.OtpModule),
      },
      {
        path: 'faq',
        loadChildren: () => import('./faq/faq.module').then((m) => m.FaqModule),
      },
      { 
        path: '404-page', 
        loadChildren: () => import('./errorfound/errorfound.module').then(m => m.ErrorfoundModule) 
      },
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
