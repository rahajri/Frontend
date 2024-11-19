import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';
import { EmailStorageService } from '../service/email-storage.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  public email: string | null = null;
  
  constructor(private emailStorageService: EmailStorageService, private translate: TranslateService) {}

  ngOnInit(): void {
    this.email = this.emailStorageService.getEmail();
    // Clear the email after fetching to avoid showing it again
    this.emailStorageService.clearEmail();
  }
}