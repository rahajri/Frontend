import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';
import { EmailStorageService } from '../service/email-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'src/app/core/services/alert/alert.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  public email: string | null = null;
  alertMessage: string | null = null;
  alertType: string = '';
  constructor(private emailStorageService: EmailStorageService, private translate: TranslateService,private alertService: AlertService) {}

  ngOnInit(): void {
    this.email = this.emailStorageService.getEmail();
    // Clear the email after fetching to avoid showing it again
    this.emailStorageService.clearEmail();
    this.alertService.alert$.subscribe((alert) => {
      if (alert) {
        this.alertMessage = alert.message;
        this.alertType = alert.type;
      } else {
        this.alertMessage = null;
        this.alertType = '';
      }
    });
  }
}