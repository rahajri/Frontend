import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';
import { EmailStorageService } from '../service/email-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent implements OnInit {
 otp: any ;
  user: any ;
  
  constructor(private userService: UserService,
    private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
      // Try using snapshot for the initial values
      this.otp = this.route.snapshot.queryParamMap.get('otp');
      this.user = this.route.snapshot.queryParamMap.get('user');
  
      console.log('OTP (snapshot):', this.otp);
      console.log('User (snapshot):', this.user);
      if (this.otp && this.user) {
        // Call the verifyEmail function
        this.userService.verifyEmail(this.otp, this.user).subscribe();
      } else {
        alert('Invalid verification link.');
      }
    }

}