import { Component,  OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Subject } from 'rxjs';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import {
  apiResultFormat,
  milestone,
  pageSelection,
} from 'src/app/core/models/models';

@Component({
  selector: 'app-project-milestone',
  templateUrl: './project-milestone.component.html',
  styleUrls: ['./project-milestone.component.scss'],
})
export class ProjectMilestoneComponent implements OnInit{
  public miles: Array<milestone> = [];
  public routes = routes;
  public dtTrigger: Subject<string> = new Subject();
 
  public url = 'milestones';
  public Toggledata = false;
  dataSource!: MatTableDataSource<milestone>;
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

 
  constructor(public data: ShareDataService) {}
  ngOnInit() {
    this.getTableData();
   
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
  

}
