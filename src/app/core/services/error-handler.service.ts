import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {
  constructor(private router: Router) {}
  handleError(error: any): void {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 401) {
        window.alert(error.message);
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        });
      } else {
        window.alert(error.message);
      }
    } else {
      console.error(error);
    }
  }
}
