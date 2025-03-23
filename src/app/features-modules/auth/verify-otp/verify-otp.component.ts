import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';
import { Subscription } from 'rxjs';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss'],
})
export class VerifyOtpComponent implements OnInit {
  subscription: Subscription | null = null;
  otp: string = '';
  user: string = '';
  userType: string = '';
  message: string = '';
  messageType: 'success' | 'error' | 'info' = 'info';
  verificationStatus: string = '';
  profil: any;

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get OTP and user from query parameters
    this.otp = this.route.snapshot.queryParamMap.get('otp') || '';
    this.user = this.route.snapshot.queryParamMap.get('user') || '';

    if (this.otp && this.user) {
      // Call service to verify OTP
      this.userService.verifyEmail(this.otp, this.user).subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.verificationStatus = 'success';
          } else {
            this.verificationStatus = 'failure';
          }
        },
        error: (error) => {
          if (error.status === 422) {
            // Account already verified   this.displayMessage('Votre compte est déjà activé.', 'info');
            this.fetchUserProfile(); // Fetch user profile even if already verified
          }
          this.verificationStatus = 'active';
        },
      });
    } else {
      this.verificationStatus = 'failure';
    }
    this.fetchUserProfile();
  }

  fetchUserProfile(): void {
    this.subscription = this.profileService.currentUserProfile$.subscribe({
      next: (profile) => {
        if (profile) {
          this.userType = profile.role;
          this.profil = profile;
        }
      },
      error: () => {
        console.error('Error fetching user profile');
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe(); // Clean up the subscription
  }
}
