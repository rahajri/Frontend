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

  limitWords(text: string | null): string {
    if (!text) {
      return '';
    }
    const words = text.split(' ');
    if (words.length <= 25) return text;
    return words.slice(0, 25).join(' ') + '...';
  }
}
