import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { WebStorage } from '../../../../core/storage/web.storage';
import { UserService } from 'src/app/features-modules/auth/service/user.service';
import { Router } from '@angular/router';
interface CustomControlerType {
  status: string;
  message: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public Toggledata = true;
  loginForm: FormGroup;

  public CustomControler: CustomControlerType | undefined;
  public subscription: Subscription;
   
   


  constructor(private storage: WebStorage,
    private userService: UserService,
    private fb: FormBuilder, private router: Router,
  ) {
    this.subscription = this.storage.Loginvalue.subscribe((data) => {
      if (data !== '0') {
        this.CustomControler = data as CustomControlerType;
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

 
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  iconLogle() {
    this.Toggledata = !this.Toggledata;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.userService.login(email, password).subscribe(
        (response) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/admin/dashboard']);
        },
        (error) => {
          // Handle login error
          console.error('Login failed', error);
          
        }
      );
    }
  }

}
