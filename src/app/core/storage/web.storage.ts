import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
interface User {
  email: string;
  password: string;
}
interface LoginResponse {
  message: string;
  status: string;
}
@Injectable({
  providedIn: 'root',
})
export class WebStorage {
  public Loginvalue = new BehaviorSubject<string | LoginResponse>('0');
  public Createaccountvalue = new BehaviorSubject<string | LoginResponse>('0');
  public Forgotpasswordvalue = new BehaviorSubject<string | LoginResponse>('0');
  constructor(private router: Router) {}

  /**
   * Create account Function call from Registerpage
   * @param uservalue from user form value
   */
  public Createaccount(uservalue: User): void {
    const Rawdata: string | null = localStorage.getItem('Loginusers');
    let Pdata: User[] = [];
    Pdata = JSON.parse(Rawdata || '[]');
    Pdata.find((f: User) => {
      if (f.email == uservalue.email) {
        this.Createaccountvalue.next('This email are already exist');
      } else {
        Pdata.push(uservalue);
        const jsonData = JSON.stringify(Pdata);
        localStorage.setItem('Loginusers', jsonData);
        this.Login(uservalue);
      }
    });
  }

  /**
   * Login Functionality call from Login
   * @param uservalue from login page
   */
  public Login(uservalue: User): void {
    const returndata : LoginResponse={message:'',status:''}
    const data: string | null = localStorage.getItem('Loginusers');
    const Pdata:  User[] = JSON.parse(data || '[]');
    const Eresult: User | undefined = Pdata.find(({ email }) => email === uservalue.email);
    if (Eresult) {
      if (Eresult.password === uservalue.password) {
        this.Createtoken(uservalue);
        this.Loginvalue.next('Login success');
        this.router.navigate(["/admin/dashboard"]);
        this.Loginvalue.next('0');
      } else {
        returndata.message='Incorrect password'
        returndata.status='password'
        this.Loginvalue.next(returndata);
      }
    } else {
      returndata.message='Email is  not valid'
      returndata.status='email'
      this.Loginvalue.next(returndata);
    }
  }

  /**
   * Create Token function for authendication
   * @param uservalue recived from login function
   */
  public Createtoken(uservalue:User) {
    const result = 'ABCDEFGHI' + uservalue.email + 'ghijklmnopqrs' + 'z01234567';
    localStorage.setItem('LoginData', result);
  }

  /**
   * Two Storage are used
   */
  public Deleteuser() {
    localStorage.removeItem('Loginusers');
    localStorage.removeItem('LoginData');
  }

  /**
   * called from Login page init statement
   */
  public Checkuser(): void {
    const users = localStorage.getItem('Loginusers');
    if (users === null) {
      const password = [
        {
          email: 'admin@dreamguys.in',
          password: '123456',
        },
      ];
      const jsonData = JSON.stringify(password);
      localStorage.setItem('Loginusers', jsonData);
    }
  }

  /**
   * Forgot password function
   * @param uservalue email object recived from Forgot password
   */
  public Forgotpassword(uservalue:User): void {
    const Rawdata:string | null = localStorage.getItem('Loginusers');
    let Pdata:  User[] = [];
    Pdata = JSON.parse(Rawdata || '[]');
    const Eresult:User | undefined  = Pdata.find(({ email }) => email === uservalue.email);
    if (Eresult) {
      const response: LoginResponse = {
        message: '',
        status: '',
      };
      this.Forgotpasswordvalue.next(response);
    } else {
      this.Forgotpasswordvalue.next('Email Not Valid');
    }
  }
}
