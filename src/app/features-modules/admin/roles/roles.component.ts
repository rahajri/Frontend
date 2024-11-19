import { Component,  } from '@angular/core';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent  {
  public filter = false;
  
  
    //Filter toggle
    openFilter(){
      this.filter = !this.filter
    }

}
