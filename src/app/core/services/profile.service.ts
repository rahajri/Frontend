import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private userProfileSource = new BehaviorSubject<any>(null);
  currentUserProfile$ = this.userProfileSource.asObservable();

  updateUserProfile(profile: any) {
    this.userProfileSource.next(profile);
  }
}
