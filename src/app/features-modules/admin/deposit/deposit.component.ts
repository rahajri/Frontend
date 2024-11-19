import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';
import { CommonService } from 'src/app/core/services/common/common.service';


@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent   {
  public routes = routes;
  public filter = false;
  base="";
  page="";
  last = '';
  public str2 ! : string;
  public str !: string;
  constructor(private common : CommonService,
    public router: Router) {
      this.common.base.subscribe((res:string)=>{
        this.base =res;
      })
      this.common.page.subscribe((res:string)=>{
        this.page =res;
      })
      this.common.last.subscribe((res:string)=>{
        this.last =res;
        this.str = this.last;
        this.str2 = this.str.charAt(0).toUpperCase() + this.str.slice(1);
      })
     }

  
  openFilter(){
    this.filter = !this.filter
  }

}
