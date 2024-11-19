import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, Editor, Toolbar } from 'ngx-editor';
import { FormControl, FormGroup } from '@angular/forms';
import { routes } from 'src/app/core/helpers/routes/routes';
import { Router } from '@angular/router';
@Component({
  selector: 'app-projects-details',
  templateUrl: './projects-details.component.html',
  styleUrls: ['./projects-details.component.scss'],
})
export class ProjectsDetailsComponent implements OnInit, OnDestroy {
  public routes = routes;
  
  public details = [];

    addDetails(array: number[]) {
      array.push(1);
    }
    deleteDetails(array: number[], index: number) {
      this.details.splice(index, 1);
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
    constructor(private router: Router) {}
    navigation() {
      this.router.navigate([routes.employee_dashboard]);
    }
    navigation1() {
      this.router.navigate([routes.freelancer_projects_proposals]);
    }
}
