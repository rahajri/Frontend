import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private userProfileSource = new BehaviorSubject<any>(null);
  currentUserProfile$ = this.userProfileSource.asObservable();
  userProfile: any;
  constructor() {
    // Load from localStorage on service initialization
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      this.userProfile = JSON.parse(savedProfile);
      this.userProfileSource.next(this.userProfile);
    }
  }

  get profile(): any {
    return this.userProfile;
  }

  set profile(profile: any) {
    this.userProfile = profile;
    localStorage.setItem('userProfile', JSON.stringify(profile)); // Save to localStorage
    this.userProfileSource.next(profile);
  }

  get profileId(): string | null {
    return this.userProfile?.id ?? null;
  }

  updateUserProfile(profile: any) {
    this.profile = profile; // Uses the setter which handles storage
  }

  clearProfile() {
    this.userProfile = null;
    localStorage.removeItem('userProfile');
    this.userProfileSource.next(null);
  }
}
