import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';
import { routes } from 'src/app/core/helpers/routes/routes';
interface data {
  value: string;
}

@Component({
  selector: 'app-postproject',
  templateUrl: './postproject.component.html',
  styleUrls: ['./postproject.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PostprojectComponent implements OnInit, OnDestroy {
  public routes = routes;
  public isChecked = true;
  selected = 'select';
  selected1 = 'select';
  editor?: Editor;
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

  ngOnInit(): void {
    this.editor = new Editor();
  }
  ngOnDestroy(): void {
    if (this.editor) {
      this.editor.destroy();
    }
  }
  tag = ['Valve profit'];
  public selectedValue1 = '';
  public selectedValue2 = '';
  public selectedValue3 = '';
  public selectedValue4 = '';
  public selectedValue5 = '';
  selectedList1: data[] = [
    { value: 'Select' },
    { value: 'Category' },
    { value: 'Project' },
  ];
  selectedList2: data[] = [
    { value: '1-3 Week' },
    { value: '1 Month' },
    { value: 'Less then a month' },
    { value: 'More then a month' },
  ];
  selectedList3: data[] = [
    { value: 'Select' },
    { value: 'Full Time' },
    { value: 'Part Time' },
    { value: 'Project Based' },
  ];
  selectedList4: data[] = [
    { value: 'Basic' },
    { value: 'Intermediate' },
    { value: 'Professional' },
  ];
  selectedList5: data[] = [
    { value: 'Basic' },
    { value: 'Intermediate' },
    { value: 'Professional' },
  ];

  activeRate = 'hourly';
  toggleHourly() {
    this.activeRate = 'hourly';
  }

  toggleFixed() {
    this.activeRate = 'fixed';
  }
  isFilenameVisible: boolean[] = [true, true, true];

  hideFilename(index: number) {
    this.isFilenameVisible[index] = false;
  }
  constructor(private router: Router) {}
  ngsubmit(){
    this.router.navigate([routes.projectconfirmation])
  }
}
