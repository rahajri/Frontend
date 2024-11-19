import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { adminrole, apiResultFormat } from 'src/app/core/models/models';

@Component({
  selector: 'app-role-permission',
  templateUrl: './role-permission.component.html',
  styleUrls: ['./role-permission.component.scss']
})
export class RolePermissionComponent implements OnInit {
  adminrole: Array<adminrole> = [];
  public totalData = 0;
  constructor( public router: Router, private data: ShareDataService) {
    // this.data.ManageUsers6.subscribe((data: any) => {
    //   this.adminrole = data
    // })
   }
   private getadminrole(): void {
    this.adminrole = [];

    this.data.adminRoleList().subscribe((res: apiResultFormat) => {
      this.totalData = res.totalData;
      res.data.map((res: adminrole) => {
        this.adminrole.push(res);
      });
    });

 
  }
  ngOnInit(): void {
    this.getadminrole();
  }




}
