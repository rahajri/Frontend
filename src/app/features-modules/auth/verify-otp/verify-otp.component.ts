import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';
 
@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss'],
})
export class VerifyOtpComponent implements OnInit {
  otp: string = '';
  user: string = '';
  userType: string = '';
  message: string = '';
  messageType: 'success' | 'error' | 'info' = 'info';
  verificationStatus: string = '';;
  profil : any ;

  constructor(private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get OTP and user from query parameters
    this.otp = this.route.snapshot.queryParamMap.get('otp') || '';
    this.user = this.route.snapshot.queryParamMap.get('user') || '';

    if (this.otp &&  this.user) {
      // Call service to verify OTP
      this.userService.verifyEmail(this.otp,  this.user).subscribe({
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
    this.userService.getUserProfile(this.user).subscribe({
      next: (profile) => {
        this.userType = profile.role; // Assuming API returns a 'type' field
        this.profil = profile; // Assuming API returns a 'type' field
       },
      error: () => {
       },
    });
  }

  
}
