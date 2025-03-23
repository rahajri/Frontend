import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private userProfileSource = new BehaviorSubject<any>(null);
  currentUserProfile$ = this.userProfileSource.asObservable();

  // Private variable to hold the user profile
  private userProfile: any = null;

  // Getter for the user profile
  get profile(): any {
    return this.userProfile;
  }

  // Setter for the user profile
  set profile(profile: any) {
    this.userProfile = profile;
    this.userProfileSource.next(profile); // Update BehaviorSubject when profile is set
  }

  // Getter for the user profile ID
  get profileId(): string | null {
    return this.userProfile ? this.userProfile.id : null; // Assuming 'id' is a property of the profile
  }

  updateUserProfile(profile: any) {
    this.userProfileSource.next(profile);
  }
}
