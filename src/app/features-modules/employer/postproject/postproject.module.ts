import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostprojectRoutingModule } from './postproject-routing.module';
import { PostprojectComponent } from './postproject.component';
import { TagInputModule } from 'ngx-chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { SharedModule } from 'src/app/shared/shared.module';

// Material Modules
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [
    PostprojectComponent
  ],
  imports: [
    CommonModule,
    PostprojectRoutingModule,
    TagInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
    SharedModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class PostprojectModule { }
