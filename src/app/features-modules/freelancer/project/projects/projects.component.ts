import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { freeprojects } from 'src/app/core/models/models';
interface data {
  value: string;
}
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  public like: boolean[] = [false];
  public isButtonVisible = true;
  public isButtonsVisible = true;
  public isButtonVisibles = true;
  public isButtonVisibl = true;
  public isButtonsVisibles = true;
  public routes = routes;
  freeprojects: Array<freeprojects> = [];
  constructor(public router: Router, private dataservice: ShareDataService) {
    this.dataservice.ManageUsers3.subscribe((data: Array<freeprojects>) => {
      this.freeprojects = data;
    });
  }
  toggleLike(index: number) {
    this.like[index] = !this.like[index];
  }
  public selectedValue1 = '';
  selectedList1: data[] = [
    { value: 'Sort by (Default)' },
    { value: 'Relevance' },
    { value: 'Rating' },
    { value: 'Popular' },
    { value: 'Latest' },
    { value: 'Free' },
  ];
  navigation() {
    this.router.navigate([routes.freelancer_project]);
  }
}
