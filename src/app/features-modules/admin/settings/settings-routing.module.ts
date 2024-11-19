import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  { path: '', 
  component: SettingsComponent,
  children: [
    { 
      path: 'general', 
      loadChildren: () => import('./general/general.module').then(m => m.GeneralModule) 
    }, 
    { 
      path: 'localization', 
      loadChildren: () => import('./localization/localization.module').then(m => m.LocalizationModule) 
    }, 
    { 
      path: 'payment', 
      loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule) 
    }, 
    { 
      path: 'email', 
      loadChildren: () => import('./email/email.module').then(m => m.EmailModule) 
    }, 
    { 
      path: 'socialmedia-login', 
      loadChildren: () => import('./socialmedia-login/socialmedia-login.module').then(m => m.SocialmediaLoginModule) 
    },
    { 
      path: 'sociallinks', 
      loadChildren: () => import('./sociallinks/sociallinks.module').then(m => m.SociallinksModule) 
    },
    { 
      path: 'seo', 
      loadChildren: () => import('./seo/seo.module').then(m => m.SeoModule) 
    }, 
    { 
      path: 'others', 
      loadChildren: () => import('./others/others.module').then(m => m.OthersModule) 
    }
  ] }, ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
