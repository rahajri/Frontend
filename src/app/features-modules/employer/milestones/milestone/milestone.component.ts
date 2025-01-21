import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Editor, Toolbar, Validators } from 'ngx-editor';

import { Subject } from 'rxjs';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import {
  apiResultFormat,
  milestone,
  pageSelection,
} from 'src/app/core/models/models';
interface data {
  value: string;
}

@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.scss'],
})
export class MilestoneComponent implements OnInit , OnDestroy{
public routes = routes

  public dtTrigger: Subject<string> = new Subject();
  public miles: Array<milestone> = [];
  public url = "milestones";
  public Toggledata  = false;
  dataSource!: MatTableDataSource<milestone>;
  public searchDataValue = '';
  selected1 = 'select';
  selected = 'select';
   
 
  
    // pagination variables
    public lastIndex = 0;
    public pageSize = 10;
    public totalData = 0;
    public skip = 0;
    public limit: number = this.pageSize;
    public pageIndex = 0;
    public serialNumberArray: Array<number> = [];
    public currentPage = 1;
    public pageNumberArray: Array<number> = [];
    public pageSelection: Array<pageSelection> = [];
    public totalPages = 0;
    //** / pagination variables

  
 
  public selectedValue = '';

  selectedList: data[] = [
    { value: 'Select' },
    { value: 'Approved' },
    { value: 'On Hold' },
  ];
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
  public selectedValue1 = '';

  selectedList1: data[] = [
    { value: 'Select' },
    { value: 'Approved' },
    { value: 'On Hold' },
    { value: 'Cancelled' },
  ];
  

  constructor(public data: ShareDataService) {}
  ngOnInit() {
    this.getTableData();
    this.editor = new Editor();
  }
  private getTableData(): void {
    this.miles = [];
    this.serialNumberArray = [];

    this.data.getEmployerMilestone().subscribe((data: apiResultFormat) => {
      this.totalData = data.totalData;
      data.data.map((res: milestone, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          this.miles.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<milestone>(this.miles);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }
  public sortData(sort: Sort) {
    const data = this.miles.slice();

    if (!sort.active || sort.direction === '') {
      this.miles = data;
    } else {
      this.miles = data.sort((a, b) => {
        const aValue = (a as never)[sort.active];

        const bValue = (b as never)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public getMoreData(event: string): void {
    if (event == 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
    } else if (event == 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
    }
  }

  public moveToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.skip = this.pageSelection[pageNumber - 1].skip;
    this.limit = this.pageSelection[pageNumber - 1].limit;
    if (pageNumber > this.currentPage) {
      this.pageIndex = pageNumber - 1;
    } else if (pageNumber < this.currentPage) {
      this.pageIndex = pageNumber + 1;
    }
    this.getTableData();
  }

  public PageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableData();
  }

  private calculateTotalPages(totalData: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalData / pageSize;
    if (this.totalPages % 1 != 0) {
      this.totalPages = Math.trunc(this.totalPages + 1);
    }
    for (let i = 1; i <= this.totalPages; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
  }
  

  ngOnDestroy(): void {
    this.editor.destroy();
  }

}
