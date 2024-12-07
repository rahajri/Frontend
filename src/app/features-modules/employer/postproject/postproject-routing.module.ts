import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostprojectComponent } from './postproject.component';
import { LoginComponent } from '../../auth/login/login.component';
import { AuthenticateGuard } from 'src/app/core/guard/auth/authenticate.guard';

const routes: Routes = [
  {
    path: '',
    component: PostprojectComponent,
    canActivate: [AuthenticateGuard],
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostprojectRoutingModule { }
