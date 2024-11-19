import { Component, OnDestroy, OnInit,  } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { empprojects } from 'src/app/core/models/models';


@Component({
  selector: 'app-completed-projects',
  templateUrl: './completed-projects.component.html',
  styleUrls: ['./completed-projects.component.scss']
})
export class CompletedProjectsComponent  implements OnInit, OnDestroy{
  public routes = routes
  empprojects: Array<empprojects> = [];
  constructor( public router: Router, private dataservice: ShareDataService) {
    this.dataservice.ManageUsers.subscribe((data:Array<empprojects>) => {
      this.empprojects = data
    })
   }
  
  
  
    editor!: Editor;
    toolbar: Toolbar = [
      ['bold', 'italic'],
      ['underline', 'strike'],
      ['code', 'blockquote'],
      ['ordered_list', 'bullet_list'],
      [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
      ['link', 'image'],
      ['text_color', 'background_color'],
      ['align_left', 'align_center', 'align_right', 'align_justify'],
    ];
  
    form = new FormGroup({
      editorContent: new FormControl('', Validators.required()),
    });
  
    ngOnInit(): void {
      this.editor = new Editor();
    }
  
    ngOnDestroy(): void {
      this.editor.destroy();
    }
 

}