// email-storage.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailStorageService {
  private email: string | null = null;

  setEmail(email: string): void {
    this.email = email;
  }

  getEmail(): string | null {
    return this.email;
  }

  clearEmail(): void {
    this.email = null;
  }
}
