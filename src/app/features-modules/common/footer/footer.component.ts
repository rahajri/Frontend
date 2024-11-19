import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent  {
public routes = routes
  
  dateNow: Date = new Date();
  date = this.dateNow.getFullYear()
  
  employer() {
    localStorage.setItem('employer', 'employer');
  }
  freelancer() {
    localStorage.setItem('freelancer', 'freelancer');
  }
  otherPages(val: string) {
    localStorage.setItem(val, val);
  }

}
