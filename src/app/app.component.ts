import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'kofejob_angular';
  ngOnInit(): void {
    // Set the primary color dynamically
    document.documentElement.style.setProperty(
      '--primary-color',
      environment.primaryColor
    );
    document.documentElement.style.setProperty(
      '--background-color',
      environment.backgroundColor
    );
    document.documentElement.style.setProperty(
      '--secondary-color',
      environment.secondaryColor
    );
    document.documentElement.style.setProperty(
      '--warning-color',
      environment.warningyColor
    );
  }
}
