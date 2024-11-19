import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { routes } from 'src/app/core/helpers/routes/routes';
import { WebStorage } from 'src/app/core/storage/web.storage';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { CandidateService } from 'src/app/core/services/condidate.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public password: boolean[] = [true];
  public routes = routes
  public Toggledata = true;
  loginForm: FormGroup;

  public CustomControler: unknown;
  public subscription: Subscription;
  loginError: string | null = null;

  constructor(private storage: WebStorage, private translate: TranslateService, private fb: FormBuilder, private router: Router, private userService: UserService,
    private candidateService: CandidateService
  ) {
    this.translate.setDefaultLang(environment.defaultLanguage);
    this.subscription = this.storage.Loginvalue.subscribe((data) => {
      if (data != '0') {
        this.CustomControler = data;
      }
    });
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }
  ngOnInit() {
    this.storage.Checkuser();
    localStorage.removeItem('LoginData');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.userService.login(email, password).subscribe(
        (response) => {
          console.log('Login successful', response);
          localStorage.setItem('token', response.token);
          if (response.role == 'candidate') {
            localStorage.setItem('email-condidature', response.email);
             this.candidateService.checkCondidate(response.email).subscribe(
              (condidate) => {
                if (condidate == true) {
                  this.router.navigate(['/freelancer/dashboards']);
                } else
                  this.router.navigate(['/pages/onboard-screen']);

              },
              (error) => {
                console.error('Error fetching candidate:', error);
              }
            );
          } else if (response.role == 'admin') {
            this.router.navigate(['/admin/dashboard']);
          }
          else if (response.role == 'company-employee') {
            this.router.navigate(['/employer/dashboard']);
           
          }
          // 
          this.loginError = null; // Clear any previous errors
        },
        (error) => {
          // Handle login error
          console.error('Login failed', error);
          this.translate.get('login.error').subscribe((translatedText) => {
            this.loginError = translatedText; // Set the translated error message
          });
        }
      );
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  iconLogle() {
    this.Toggledata = !this.Toggledata;
  }
  otherPages(val: string) {
    localStorage.setItem(val, val);
  }


  public togglePassword(index: number) {
    this.password[index] = !this.password[index];
  }
}
