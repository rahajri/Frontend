import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  // Observable to track the current alert
  private alertSubject = new BehaviorSubject<{ message: string, type: string } | null>(null);

  constructor() {}

  // Observable to expose alert data
  get alert$() {
    return this.alertSubject.asObservable();
  }

  // Method to show alert
  showAlert(message: string, type: string = 'success') {
    this.alertSubject.next({ message, type });

    // Automatically hide the alert after 5 seconds
    setTimeout(() => this.clearAlert(), 5000);
  }

  // Method to clear the alert
  clearAlert() {
    this.alertSubject.next(null);
  }
}
