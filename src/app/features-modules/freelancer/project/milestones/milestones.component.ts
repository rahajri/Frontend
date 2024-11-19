import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { freelancerMilestones, pageSelection, apiResultFormat } from 'src/app/core/models/models';
interface data {
  value: string;
}
@Component({
  selector: 'app-milestones',
  templateUrl: './milestones.component.html',
  styleUrls: ['./milestones.component.scss'],
})
export class MilestonesComponent implements OnInit, OnDestroy {
  public routes = routes;
  public selectedValue1 = '';
  public selectedValue2 = '';
  public selectedValue3 = '';
  public selectedValue4 = '';
  public selectedValue5 = '';
  public selectedValue6 = '';
  public selectedValue7 = '';
  public selectedValue8 = '';
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
    this.getTableData();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
  selectedList1: data[] = [
    { value: 'Completed' },
    { value: 'Inprogress' },
    { value: 'On Hold' },
    { value: 'Cancel' },
  ];
  selectedList2: data[] = [
    { value: 'On Hold' },
    { value: 'Completed' },
    { value: 'Inprogress' },
    { value: 'Cancel' },
  ];
  selectedList3: data[] = [
    { value: 'Completed' },
    { value: 'Inprogress' },
    { value: 'On Hold' },
    { value: 'Cancel' },
  ];
  selectedList4: data[] = [
    { value: 'Inprogress' },
    { value: 'On Hold' },
    { value: 'Completed' },
    { value: 'Cancel' },
  ];
  selectedList5: data[] = [
    { value: 'On Hold' },
    { value: 'Completed' },
    { value: 'Inprogress' },
    { value: 'Cancel' },
  ];
  selectedList6: data[] = [
    { value: 'On Hold' },
    { value: 'Completed' },
    { value: 'Inprogress' },
    { value: 'Cancel' },
  ];
  selectedList7: data[] = [
    { value: 'On Hold' },
    { value: 'Completed' },
    { value: 'Inprogress' },
    { value: 'Cancel' },
  ];
  selectedList8: data[] = [
    { value: '10' },
    { value: '20' },
    { value: '30' },
    { value: '40' },
  ];
  public freelancerMilestones: Array<freelancerMilestones> = [];
  dataSource!: MatTableDataSource<freelancerMilestones>;

  public showFilter = false;
  public searchDataValue = '';
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

  constructor(public data: ShareDataService) {}
  private getTableData(): void {
    this.freelancerMilestones = [];
    this.serialNumberArray = [];

    this.data.getFreelancerMilestones().subscribe((data: apiResultFormat) => {
      this.totalData = data.totalData;
      data.data.map((res: freelancerMilestones, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          this.freelancerMilestones.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<freelancerMilestones>(this.freelancerMilestones);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }
  public sortData(sort: Sort) {
    const data = this.freelancerMilestones.slice();

    if (!sort.active || sort.direction === '') {
      this.freelancerMilestones = data;
    } else {
      this.freelancerMilestones = data.sort((a, b) => {
         
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
