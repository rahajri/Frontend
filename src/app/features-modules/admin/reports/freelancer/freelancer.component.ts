/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
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
  selector: 'app-freelancer',
  templateUrl: './freelancer.component.html',
  styleUrls: ['./freelancer.component.scss'],
})
export class FreelancerComponent implements OnInit {
  public dtTrigger: Subject<any> = new Subject();
  public lstEarning!: any[];
  public url: any = 'admin';
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  constructor(private dataService: ShareDataService) {
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
    this.loadEarning();
  }
  // Get hostel List  Api Call
  loadEarning() {
    // this.lstEarning = this.dataService.adminEarning
  }
}
