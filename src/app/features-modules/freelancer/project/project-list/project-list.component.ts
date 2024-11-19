import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';
interface data {
  value: string;
}
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent {
  public routes = routes;
  public selectedValue1 = '';
  public like : boolean[] = [false];

  selectedList1: data[] = [
    { value: 'Relevance' },
    { value: 'Rating' },
    { value: 'Popular' },
    { value: 'Latest' },
    { value: 'Free' },
  ];
  toggleLike(index: number){
    this.like[index] = !this.like[index]
  }
}
