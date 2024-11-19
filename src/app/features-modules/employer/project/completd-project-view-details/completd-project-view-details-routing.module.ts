import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompletdProjectViewDetailsComponent } from './completd-project-view-details.component';

const routes: Routes = [{ path: '', component: CompletdProjectViewDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompletdProjectViewDetailsRoutingModule { }
