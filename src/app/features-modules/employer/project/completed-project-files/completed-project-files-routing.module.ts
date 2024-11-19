import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompletedProjectFilesComponent } from './completed-project-files.component';

const routes: Routes = [{ path: '', component: CompletedProjectFilesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompletedProjectFilesRoutingModule { }
