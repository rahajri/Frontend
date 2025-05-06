/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';
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
import { Candidature } from 'src/app/core/models/models';
import { ProjectService } from 'src/app/core/services/project.service';
import { routes } from 'src/app/core/helpers/routes/routes';
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

declare var bootstrap: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public routes = routes;
  public searchDataValue = '';
  dataSource!: MatTableDataSource<any>;

  // pagination variables
  public lastIndex = 0;
  public pageSize = 10;
  public totalData = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<any> = [];
  public currentPage = 1;
  public pageNumberArray: Array<any> = [];
  public pageSelection: Array<pageSelection> = [];
  public totalPages = 0;
  public filter = false;
  public lstBoard: Candidature[] = [];
  public url = 'admin';
  selectedStatus: string | null = null;
  candidatures: any = [];
  candidatureToChange: any = [];
  selectedCandidature: any;
  newStatus: string = 'Accepted';

  public counter: number = 0;
  public totalCandidates: number = 0;
  public totalClients: number = 0;
  public totalprojects: number = 0;
  public totalCandidatures: number = 0;
  appliedCount: number = 0;
  recruitmentApprovedCount: number = 0;

  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  constructor(
    private data: ShareDataService,
    private projectService: ProjectService
  ) {
    this.chartOptions = {
      series: [
        {
          name: 'Freelance Developers',
          data: [31, 40, 28, 51, 42, 109, 100],
          color: '#ff5b37',
        },
        {
          name: 'Developers Per Project',
          data: [11, 32, 45, 32, 34, 52, 41],
          color: '#ffb8a8',
        },
        {
          name: 'Offres Terminées',
          data: [12, 36, 42, 30, 39, 58, 40],
          color: '#feb019',
        },
      ],
      chart: {
        height: 350,
        type: 'area',
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2018-09-19T00:00:00.000Z',
          '2018-09-19T01:30:00.000Z',
          '2018-09-19T02:30:00.000Z',
          '2018-09-19T03:30:00.000Z',
          '2018-09-19T04:30:00.000Z',
          '2018-09-19T05:30:00.000Z',
          '2018-09-19T06:30:00.000Z',
        ],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
    };
  }

  ngOnInit(): void {
    this.getTableData();
    this.getAdminCharts();
  }

  private getTableData(): void {
    this.lstBoard = [];
    this.serialNumberArray = [];

    this.projectService
      .getCandidatures(this.currentPage, this.pageSize, this.selectedStatus)
      .subscribe({
        next: (res) => {
          this.totalData = res.total;
          this.counter = res.all;
          this.appliedCount = res.appliedCount;
          this.recruitmentApprovedCount = res.recruitmentApprovedCount;
          res.data.forEach((candidate: any, index: number) => {
            const serialNumber = index + 1;
            if (index >= this.skip && serialNumber <= this.limit) {
              this.lstBoard.push(candidate);
              this.serialNumberArray.push(serialNumber);
            }
          });
          this.dataSource = new MatTableDataSource<any>(this.lstBoard); // Update the data source
          this.calculateTotalPages(this.totalData, this.pageSize); // Calculate total pages
        },
        error: (err) => {
          console.error(err); // Handle error
        },
      });
  }

  public filterOffersByStatus(status: string | null): void {
    this.selectedStatus = status;
    this.currentPage = 1;
    this.getTableData();
  }

  public sortData(sort: Sort) {
    const data = this.lstBoard.slice();

    if (!sort.active || sort.direction === '') {
      this.lstBoard = data;
    } else {
      this.lstBoard = data.sort((a, b) => {
        const aValue = this.getValue(a, sort.active);
        const bValue = this.getValue(b, sort.active);

        // Handle null values
        if (aValue == null && bValue == null) return 0;
        if (aValue == null) return 1;
        if (bValue == null) return -1;

        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  private getValue(item: Candidature, key: string): any {
    switch (key) {
      case 'companyName':
        return item.jobOffer?.company?.name;
      case 'offerTitle':
        return item.jobOffer?.title;
      case 'contractType':
        return item.jobOffer?.contractType?.description;
      case 'candidate':
        return `${item.candidate?.firstName} ${item.candidate?.lastName}`;
      case 'status':
        return item.status?.name;
      default:
        return null; // Handle any unknown keys
    }
  }

  public searchData(value: string): void {
    const filterValue = value.trim().toLowerCase();
    // Filter the data based on the search criteria
    const translatedStatus = this.translateStatusToEnglish(value.trim());
    this.lstBoard = this.dataSource.data.filter((candidate: Candidature) => {
      return (
        candidate.candidate.firstName.toLowerCase().includes(filterValue) ||
        candidate.candidate.lastName.toLowerCase().includes(filterValue) ||
        candidate.candidate.phone.toLowerCase().includes(filterValue) ||
        candidate.jobOffer.title.toLowerCase().includes(filterValue) ||
        candidate.jobOffer.company.name.toLowerCase().includes(filterValue) ||
        candidate.status.name.toLowerCase() === translatedStatus.toLowerCase()
      );
    });
  }

  public getMoreData(event: string): void {
    if (event === 'next' && this.currentPage < this.totalPages) {
      this.currentPage++;
    } else if (event === 'previous' && this.currentPage > 1) {
      this.currentPage--;
    }
    this.getTableData(); // Fetch the data for the new page
  }

  public moveToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.getTableData(); // Fetch the data for the selected page
  }

  public changePageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableData();
  }

  public changeStatus(): void {
    this.selectedStatus =
      this.selectedStatus === 'null' ? null : this.selectedStatus;
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

  deleteCandidature(candidature: any) {
    this.projectService.deleteCandidature(candidature?.id).subscribe({
      next: (res) => {
        this.hideModal('delete_Candidature');
        this.getTableData();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  changeCandidatureStatus(candidatureId: string, status: string) {
    this.projectService
      .changeCandidatureStatus(candidatureId, status)
      .subscribe({
        next: (res) => {
          this.hideModal('change_status');
          this.getTableData();
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  showCandidatureDetailsModal(candidature: any) {
    this.selectedCandidature = candidature;
    const modalElement = document.getElementById('show-candidature-details');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
      modalElement.focus();
    }
  }

  showChangeCandidatureStatusModal(candidature: any, status: string) {
    this.newStatus = status;
    this.candidatureToChange = candidature;
    const modalElement = document.getElementById('change_status');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
      modalElement.focus();
    }
  }

  hideModal(id: string) {
    const modalElement = document.getElementById(id);
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }

  translateStatusToFrench = (status: string): string => {
    const statusTranslations: { [key: string]: string } = {
      Applied: 'Candidature Soumise',
      'Recruitment Approved': 'Recrutement a Approuvé',
      Rejected: 'Rejeté',
      Accepted: 'Accepté',
    };

    return statusTranslations[status] || status;
  };

  getStatusClass = (status: string): string => {
    switch (status) {
      case 'Applied':
        return 'text-primary';
      case 'Recruitment Approved':
        return 'text-info';
      case 'Rejected':
        return 'text-danger';
      case 'Accepted':
        return 'text-success';
      default:
        return 'text-secondary';
    }
  };

  getAdminCharts() {
    this.projectService.adminDashboardCharts().subscribe({
      next: (res) => {
        console.log(res);
        this.totalCandidatures = res.totalCandidatures;
        this.totalprojects = res.totalprojects;
        this.totalClients = res.totalClients;
        this.totalCandidates = res.totalCandidates;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getDate(isoDate: any): string {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat('en-GB').format(date);
  }

  // Reverse translation from French to English
  translateStatusToEnglish = (status: string): string => {
    const statusTranslations: { [key: string]: string } = {
      'Candidature Soumise': 'Applied',
      'Recrutement a Approuvé': 'Recruitment Approved',
      Rejeté: 'Rejected',
      Accepté: 'Accepted',
    };

    return statusTranslations[status] || status;
  };

  ckrollToTable() {
    const element = document.getElementById('candidatures-table');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
export interface pageSelection {
  skip: number;
  limit: number;
}
