import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, Editor, Toolbar } from 'ngx-editor';
import { FormControl, FormGroup } from '@angular/forms';
import { routes } from 'src/app/core/helpers/routes/routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  public details = [];
  public routes = routes;
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
    ['ordered_list'],
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
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  images = [
    {
      path: 'assets/img/project-8.jpg',
      name: 'Education',
      role: 'Web design',
    },
    {
      path: 'assets/img/project-9.jpg',
      name: 'PHOTOSHOOT',
      role: 'Web design',
    },
    {
      path: 'assets/img/project-10.jpg',
      name: 'ELECTRICAL',
      role: 'Web design',
    },
    {
      path: 'assets/img/project-11.jpg',
      name: 'PROJECT NAME',
      role: 'Web design',
    },
  ];
  constructor(private router: Router) {}
  navigation() {
    this.router.navigate([routes.employee_dashboard]);
  }
  navigation2() {
    this.router.navigate([routes.freelancer_projects_proposals]);
  }
}
