import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './core/services/auth/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { NavigationService } from './core/services/navigate.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'kofejob_angular';
  constructor(
    private authService: AuthService,
    private route: Router,
    private navigationService: NavigationService
  ) {
    this.route.events
      .pipe(
        filter(
          (event: any): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        this.navigationService.setPreviousUrl(event.url);
      });
  }
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.validateToken();
    }
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
  validateToken() {
    this.authService.validateToken().subscribe({
      next: (response) => {},
      error: (error) => {
        this.authService.logout();
        this.route.navigate(['/auth/login']);
      },
    });
  }
}
