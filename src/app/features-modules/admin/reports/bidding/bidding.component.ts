/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexTooltip,
  ApexFill,
  ApexResponsive,
} from 'ng-apexcharts';
import { adminReports } from 'src/app/core/models/models';
export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  dataLabels: ApexDataLabels | any;
  grid: ApexGrid | any;
  stroke: ApexStroke | any;
  title: ApexTitleSubtitle | any;
  plotOptions: ApexPlotOptions | any;
  yaxis: ApexYAxis | ApexYAxis[] | any;
  legend: ApexLegend | any;
  tooltip: ApexTooltip | any;
  responsive: ApexResponsive[] | any;
  fill: ApexFill | any;
  labels: string[] | any;
};
@Component({
  selector: 'app-bidding',
  templateUrl: './bidding.component.html',
  styleUrls: ['./bidding.component.scss'],
})
export class BiddingComponent implements OnInit {
  public searchDataValue = '';
  dataSource!: MatTableDataSource<adminReports>;

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
  public lstProj : adminReports[] = []
  public url = 'admin';
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  constructor(private data: ShareDataService) {
    this.chartOptions = {
      series: [
        {
          name: 'Maximum',
          data: [4, 2, 8, 10, 9, 17, 0, 25, 2, 0, 14, 4],
          color: '#FF5B37',
        },
        {
          name: 'Minimum',
          data: [30, 20, 18, 47, 19, 52, 4, 16, 42, 15, 12, 18],
          color: '#7E84A3',
        },
      ],
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      legend: {
        show: false,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '20px',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        show: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        axisTicks: {
          show: true,
          color: '#000000',
        },
        axisBorder: {
          show: true,
          color: '#000000',
        },
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
      yaxis: {
        axisTicks: {
          show: true,
          color: '#000000',
        },
        axisBorder: {
          show: true,
          color: '#000000',
        },
        min: 0,
        max: 80,
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val: string) {
            return val;
          },
        },
      },
    };
  }

  ngOnInit(): void {
    this.getlstProj();
  }
  private getlstProj(): void {
    this.lstProj = [];
    this.serialNumberArray = [];

    this.data.adminReports().subscribe((res) => {
      this.totalData = res.totalData;
      res.data.map((res: adminReports, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          res.id = serialNumber;
          this.lstProj.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<adminReports>(this.lstProj);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }
  public sortData(sort: Sort) {
    const data = this.lstProj.slice();

    if (!sort.active || sort.direction === '') {
      this.lstProj = data;
    } else {
      this.lstProj = data.sort((a, b) => {
        const aValue = (a as never)[sort.active];
        const bValue = (b as never)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public searchData(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.lstProj = this.dataSource.filteredData;
  }

  public getMoreData(event: string): void {
    if (event == 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getlstProj();
    } else if (event == 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getlstProj();
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
    this.getlstProj();
  }

  public changePageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getlstProj();
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
