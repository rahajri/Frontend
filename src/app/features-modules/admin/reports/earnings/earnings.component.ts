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
  ApexMarkers,
} from 'ng-apexcharts';
import { adminEarning } from 'src/app/core/models/models';
export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  dataLabels: ApexDataLabels | any;
  markers: ApexMarkers | any;
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
  toolbar: any;
  colors: any;
};
@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.scss'],
})
export class EarningsComponent implements OnInit {
  public searchDataValue = '';
  dataSource!: MatTableDataSource<adminEarning>;

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
  public lstEarning : adminEarning[] = []
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  constructor(private data: ShareDataService) {
    this.chartOptions = {
      series: [
        {
          name: 'Maximum',
          data: [0, 5, 16, 7, 18, 26, 7, 21, 10, 7, 10],
          color: '#ff5b37',
        },
      ],
      markers: {
        size: 4,
        hover: {
          size: 5,
        },
      },
      chart: {
        height: 350,
        type: 'line',

        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 1,
      },
      xaxis: {
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
          'oct',
          'nov',
          'dec',
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
        min: -2,
        max: 30,
      },
      tooltip: {
        x: {
          format: 'MMM',
        },
      },
    };
  }

  ngOnInit(): void {
    this.getlstEarning();
  }
  private getlstEarning(): void {
    this.lstEarning = [];
    this.serialNumberArray = [];

    this.data.adminEarning().subscribe((res) => {
      this.totalData = res.totalData;
      res.data.map((res: adminEarning, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          res.id = serialNumber;
          this.lstEarning.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<adminEarning>(this.lstEarning);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }
  public sortData(sort: Sort) {
    const data = this.lstEarning.slice();

    if (!sort.active || sort.direction === '') {
      this.lstEarning = data;
    } else {
      this.lstEarning = data.sort((a, b) => {
        const aValue = (a as never)[sort.active];
        const bValue = (b as never)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public searchData(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.lstEarning = this.dataSource.filteredData;
  }

  public getMoreData(event: string): void {
    if (event == 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getlstEarning();
    } else if (event == 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getlstEarning();
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
    this.getlstEarning();
  }

  public changePageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getlstEarning();
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
