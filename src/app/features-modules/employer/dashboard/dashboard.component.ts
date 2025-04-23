/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexMarkers,
} from 'ng-apexcharts';
import { Subscription } from 'rxjs';
import { routes } from 'src/app/core/helpers/routes/routes';
import { ProfileService } from 'src/app/core/services/profile.service';
import { ProjectService } from 'src/app/core/services/project.service';

export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  yaxis: ApexXAxis | any;
  dataLabels: ApexDataLabels | any;
  grid: ApexGrid | any;
  stroke: ApexStroke | any;
  title: ApexTitleSubtitle | any;
  markers: ApexMarkers[] | any;
};
export type radialChartOptions = {
  series: ApexNonAxisChartSeries | any;
  chart: ApexChart | any;
  labels: string[] | any;
  plotOptions: ApexPlotOptions | any;
  markers: string[] | any;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  public routes = routes;
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public radialchartOptions: Partial<ChartOptions> | any;
  subscription: Subscription | null = null;
  companyId: string | null = null;

  totalOffers: number = 0;
  ActiveOffers: number = 0;
  closedOffers: number = 0;
  candidatures: number = 0;
  constructor(
    private readonly projectService: ProjectService,
    private readonly profileService: ProfileService
  ) {
    this.chartOptions = {
      series: [
        {
          name: 'visualisations de profil',
          data: [100, 150, 200, 250, 200, 250, 200, 200, 200, 200, 300, 350],
          colors: ['#FF5B37'],
        },
      ],
      chart: {
        height: 360,

        type: 'line',
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },

      stroke: {
        colors: ['#FF5B37'],
        curve: 'straight',
        width: [1],
      },

      xaxis: {
        categories: [
          'Janv',
          'Févr',
          'Mars',
          'Avr',
          'Mai',
          'Juin',
          'Juil',
          'Août',
          'Sept',
          'Oct',
          'Nov',
          'Déc',
        ],
      },
      yaxis: {
        lines: {
          show: true,
        },
      },

      markers: {
        size: 4,
        colors: ['#FF5B37'],
        strokeColors: '#FF5B37',
        strokeWidth: 1,
        hover: {
          size: 7,
        },
      },
      grid: {
        position: 'front',
        borderColor: '#ddd',
        strokeDashArray: 7,
        xaxis: {
          lines: {
            show: true,
          },
        },
      },
    };

    this.radialchartOptions = {
      series: [85, 75, 60, 40],
      chart: {
        toolbar: {
          show: false,
        },
        height: 250,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: '50%',
            background: 'transparent',
            image: undefined,
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: false,
            },
          },
        },
      },
      colors: ['#7B46BE', '#FACD3A', '#24C0DC', '#FA6CA4'],
      labels: ['Applied Jobs', 'Messenger', 'Facebook', 'LinkedIn'],
      legend: {
        show: false,
        floating: true,
        fontSize: '16px',
        position: 'bottom',
        offsetX: 160,
        offsetY: 15,
        labels: {
          useSeriesColors: true,
        },
        markers: {
          size: 0,
        },

        itemMargin: {
          vertical: 3,
        },
      },
    };
  }

  ngOnInit(): void {
    this.initializeUserProfileSubscription();
  }

  private initializeUserProfileSubscription(): void {
    this.subscription = this.profileService.currentUserProfile$.subscribe({
      next: (profile) => this.handleProfileUpdate(profile),
      error: (err) => this.handleProfileError(err),
    });
  }

  private handleProfileUpdate(profile: any): void {
    if (!profile?.company?.id) {
      return;
    }

    this.companyId = profile.company.id;
    this.loadCounts();
  }

  private handleProfileError(error: any): void {
    console.error('Failed to load user profile:', error);
    // Consider adding user notification or error state handling
  }

  private loadCounts(): void {
    if (!this.companyId) {
      console.error('Cannot load counts: Company ID is null');
      return;
    }

    this.projectService.employerDashboardCharts(this.companyId).subscribe({
      next: (res) => this.updateDashboardCounts(res),
      error: (err) => this.handleCountsError(err),
    });
  }

  private updateDashboardCounts(response: any): void {
    this.totalOffers = response.totalOffers;
    this.ActiveOffers = response.activeOffers;
    this.closedOffers = response.closedOffers;
    this.candidatures = response.candidatures;

    this.updateChartData([
      this.totalOffers,
      this.candidatures,
      this.ActiveOffers,
      this.closedOffers,
    ]);
  }

  private updateChartData(seriesData: number[]): void {
    this.radialchartOptions = {
      ...this.radialchartOptions,
      series: seriesData,
    };
  }

  private handleCountsError(error: any): void {
    console.error('Failed to load dashboard counts:', error);
    // Consider adding user notification or fallback UI state
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
