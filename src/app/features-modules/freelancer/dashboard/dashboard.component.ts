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
} from 'ng-apexcharts';
import { routes } from 'src/app/core/helpers/routes/routes';
import { IaService } from 'src/app/core/services/ia.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { ProjectService } from 'src/app/core/services/project.service';

export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  dataLabels: ApexDataLabels | any;
  grid: ApexGrid | any;
  stroke: ApexStroke | any;
  title: ApexTitleSubtitle | any;
  colors: any;
  markers: any;
  yaxis: any;
};
export type radialChartOptions = {
  series: ApexNonAxisChartSeries | any;
  chart: ApexChart | any;
  labels: string[] | any;
  plotOptions: ApexPlotOptions | any;
  colors: string[];
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
  candidateId: string | null = null;
  Candidatures: number = 0;
  acceptedCandidature: number = 0;
  rejectedCandidature: number = 0;
  matching: number = 0;

  constructor(
    private projectService: ProjectService,
    private profileService: ProfileService,
    private iaService: IaService
  ) {
    this.chartOptions = {
      series: [
        {
          name: 'visualisations de profil',
          data: [100, 150, 200, 250, 200, 250, 200, 200, 200, 200, 300, 350],
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
      colors: ['#FF5B37'],
      stroke: {
        curve: 'straight',
        width: [1],
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
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
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
      colors: ['#FACD3A', '#7B46BE', '#FA6CA4', '#24C0DC'],
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
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: false,
            },
          },
        },
      ],
    };
  }
  ngOnInit(): void {
    this.initializeCandidateDashboard();
  }

  private initializeCandidateDashboard(): void {
    this.candidateId = this.profileService.profileId;

    if (!this.candidateId) {
      console.warn('Candidate ID not available');
      return;
    }

    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    this.loadMatchingOffers();
    this.loadCounts();
  }

  private loadCounts(): void {
    if (!this.candidateId) {
      console.error('Cannot load counts: Candidate ID is null');
      return;
    }

    this.projectService.candidateDashboardCharts(this.candidateId).subscribe({
      next: (res) => this.updateCandidateCounts(res),
      error: (err) => this.handleCountsError(err),
    });
  }

  private updateCandidateCounts(response: any): void {
    this.Candidatures = response.Candidatures;
    this.acceptedCandidature = response.acceptedCandidature;
    this.rejectedCandidature = response.rejectedCandidature;

    this.updateChartData([
      this.Candidatures, // Total candidatures
      this.acceptedCandidature, // Accepted candidatures
      this.rejectedCandidature, // Rejected candidatures
      this.matching, // Matching offers count
    ]);
  }

  private async loadMatchingOffers(): Promise<void> {
    if (!this.candidateId) {
      console.error('Cannot load matching offers: Candidate ID is null');
      return;
    }

    try {
      const offers = await this.iaService.iaOffers(this.candidateId);
      this.updateMatchingOffersCount(offers);
      // Trigger chart update since matching count changed
      this.updateCandidateCounts({
        Candidatures: this.Candidatures,
        acceptedCandidature: this.acceptedCandidature,
        rejectedCandidature: this.rejectedCandidature,
      });
    } catch (error) {
      this.handleMatchingOffersError(error);
    }
  }

  private updateMatchingOffersCount(offers: any[]): void {
    this.matching = offers.length;
  }

  private updateChartData(seriesData: number[]): void {
    this.radialchartOptions = {
      ...this.radialchartOptions,
      series: seriesData,
    };
  }

  private handleCountsError(error: any): void {
    console.error('Failed to load candidate counts:', error);
  }

  private handleMatchingOffersError(error: any): void {
    console.error('Failed to load matching offers:', error);
  }
}
