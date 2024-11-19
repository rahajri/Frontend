import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { apiResultFormat, defaultdata } from 'src/app/core/models/models';
@Component({
  selector: 'app-data-tables',
  templateUrl: './data-tables.component.html',
  styleUrls: ['./data-tables.component.scss']
})
export class DataTablesComponent implements OnInit {
  public searchDataValue = '';
  dataSource!: MatTableDataSource< defaultdata>;

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
  public defaultdataTable!:Array<defaultdata> ;
  constructor(private data: ShareDataService) { }

  ngOnInit(): void {
    this.getdefaultdataTable();
  }
  private getdefaultdataTable(): void {
    this.defaultdataTable = [];
    this.serialNumberArray = [];

    this.data.defaultData().subscribe((res: apiResultFormat) => {
      this.totalData = res.totalData;
      res.data.map((res: defaultdata, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          res.id = serialNumber;
          this.defaultdataTable.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
         this.dataSource = new MatTableDataSource< defaultdata>(this.defaultdataTable);
    this.calculateTotalPages(this.totalData, this.pageSize);
    });

 
  }
  public sortData(sort: Sort) {
    const data = this.defaultdataTable.slice();

    if (!sort.active || sort.direction === '') {
      this.defaultdataTable = data;
    } else {
       
      this.defaultdataTable = data.sort((a, b) => {
          
        const aValue = (a as never)[sort.active];
          
        const bValue = (b as never)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
  
  public searchData(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.defaultdataTable = this.dataSource.filteredData;
  }

  public getMoreData(event: string): void {
    if (event == 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getdefaultdataTable();
    } else if (event == 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getdefaultdataTable();
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
    this.getdefaultdataTable();
  }

  public changePageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getdefaultdataTable();
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
export interface pageSelection {
  skip: number;
  limit: number;
}
