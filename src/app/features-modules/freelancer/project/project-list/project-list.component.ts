import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';
import { ProjectService } from 'src/app/core/services/project.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
interface data {
  value: string;
}
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent {
  public routes = routes;
  public selectedValue1 = '';
  public like: boolean[] = [false];
  baseUrl = environment.apiUrl;
  offers: any[] = [];
  globalErrorMessage: boolean = false;
  activities: any[] = [];
  displayedActivities = 5;
  subActivities: any[] = [];
  displayedSubActivities = 5;
  contractTypes: any[] = [];

  selectedList1: data[] = [
    { value: 'Relevance' },
    { value: 'Rating' },
    { value: 'Popular' },
    { value: 'Latest' },
    { value: 'Free' },
  ];
  constructor(public router: Router, private projectService: ProjectService) {}

  toggleLike(index: number) {
    this.like[index] = !this.like[index];
  }

  ngOnInit(): void {
    this.getOffers();
    this.getActivities();
    this.getSubActivities();
    this.getContractTypes();
  }

  getOffers() {
    this.projectService.getPublishedOffers().subscribe({
      next: (data) => {
        this.offers = data;
      },
      error: (error) => {
        console.error(error);
        this.globalErrorMessage = true;
      },
    });
  }

  getContractTypes() {
    this.projectService.getContractTypes().subscribe({
      next: (data) => {
        this.contractTypes = data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  limitWords(text: string | null): string {
    if (!text) {
      return '';
    }
    const words = text.split(' ');
    if (words.length <= 25) return text;
    return words.slice(0, 25).join(' ') + '...';
  }

  getActivities() {
    this.projectService.getActivities().subscribe({
      next: (data) => {
        this.activities = data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  showMore() {
    if (this.displayedActivities + 5 <= this.activities.length) {
      this.displayedActivities += 5;
    } else {
      this.displayedActivities = this.activities.length; // Show all if fewer than 5 remain
    }
  }

  showLess() {
    if (this.displayedActivities - 5 >= 5) {
      this.displayedActivities -= 5;
    } else {
      this.displayedActivities = 5; // Reset to initial state
    }
  }

  getSubActivities() {
    this.projectService.getSubActivities().subscribe({
      next: (data) => {
        this.subActivities = data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  showMoreSubActivities() {
    if (this.displayedSubActivities + 5 <= this.subActivities.length) {
      this.displayedSubActivities += 5;
    } else {
      this.displayedSubActivities = this.subActivities.length; // Show all if fewer than 5 remain
    }
  }

  showLessSubActivities() {
    if (this.displayedSubActivities - 5 >= 5) {
      this.displayedSubActivities -= 5;
    } else {
      this.displayedSubActivities = 5; // Reset to initial state
    }
  }
}
