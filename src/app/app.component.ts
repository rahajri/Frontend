import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'kofejob_angular';
  constructor(private authService: AuthService, private route: Router) {}
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
