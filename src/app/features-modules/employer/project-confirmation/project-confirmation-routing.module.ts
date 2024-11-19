import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectConfirmationComponent } from './project-confirmation.component';

const routes: Routes = [{ path: '', component: ProjectConfirmationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectConfirmationRoutingModule { }
