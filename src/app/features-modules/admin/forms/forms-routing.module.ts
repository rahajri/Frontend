import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsComponent } from './forms.component';

const routes: Routes = [
  { path: '', 
  component: FormsComponent,
  children: [
    { 
      path: 'basic-inputs', 
    loadChildren: () => import('./basic-inputs/basic-inputs.module').then(m => m.BasicInputsModule) 
  }, 
    { 
      path: 'form-validation', 
    loadChildren: () => import('./form-validation/form-validation.module').then(m => m.FormValidationModule) 
  }, 
    { 
      path: 'horizontal-forms', 
    loadChildren: () => import('./horizontal-forms/horizontal-forms.module').then(m => m.HorizontalFormsModule) 
  }, 
    { 
      path: 'input-groups', 
    loadChildren: () => import('./input-groups/input-groups.module').then(m => m.InputGroupsModule) 
  }, 
    { 
      path: 'vertical-form', 
    loadChildren: () => import('./vertical-form/vertical-form.module').then(m => m.VerticalFormModule) 
  }
  ] }, ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
