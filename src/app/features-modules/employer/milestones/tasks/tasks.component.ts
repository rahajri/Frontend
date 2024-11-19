import { Component, OnInit } from '@angular/core';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  apiResultFormat,
  pageSelection,
  task,
} from 'src/app/core/models/models';
import { routes } from 'src/app/core/helpers/routes/routes';
export interface data {
  value: string;
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit{
  public routes = routes
  public task: Array<task> = [];
 
  public url = 'milestones';
  constructor(public data: ShareDataService) {}
  dataSource!: MatTableDataSource<task>;
  public searchDataValue = '';

  
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

  ngOnInit() {
    this.getTableData();
  }
  

  private getTableData(): void {
    this.task = [];
    this.serialNumberArray = [];

    this.data.getTask().subscribe((data: apiResultFormat) => {
      this.totalData = data.totalData;
      data.data.map((res: task, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          this.task.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<task>(this.task);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }
  public sortData(sort: Sort) {
    const data = this.task.slice();

    if (!sort.active || sort.direction === '') {
      this.task = data;
    } else {
      this.task = data.sort((a, b) => {
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

  public selectedValue1 = '';
  public selectedValue2 = '';
  public selectedValue3 = '';
  selectedList1: data[] = [
    { value: 'Select' },
    { value: 'InProgress' },
    { value: 'Completed' },
    { value: 'Pending' },
    { value: 'Cancelled' },
  ];
  selectedList2: data[] = [
    { value: 'Select' },
    { value: 'Research' },
    { value: 'Design' },
    { value: 'Pending' },
    { value: 'Development' },
  ];
  selectedList3: data[] = [
    { value: 'Select' },
    { value: 'Creating a Logo Concept' },
    { value: 'Design' },
    { value: 'Development' },
  ];
}
