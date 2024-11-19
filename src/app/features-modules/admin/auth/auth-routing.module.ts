import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  { 
    path: '', 
    component: AuthComponent,
    children: [
      { 
        path: 'login', 
        loadChildren: () => import('./login/login.module').then((m) => m.LoginModule) }, 
      { 
        path: 'forgot-password', 
        loadChildren: () => import('./forgot-password/forgot-password.module').then((m) => m.ForgotPasswordModule) }, 
      { 
        path: 'register', 
        loadChildren: () => import('./register/register.module').then((m) => m.RegisterModule) }
    ] 
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
