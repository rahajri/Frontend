import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsDetailsComponent } from './projects-details.component';

const routes: Routes = [{ path: '', component: ProjectsDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsDetailsRoutingModule { }
