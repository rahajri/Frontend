import { Component } from '@angular/core';
interface data {
  value: string;
}

@Component({
  selector: 'app-identify',
  templateUrl: './identify.component.html',
  styleUrls: ['./identify.component.scss']
})
export class IdentifyComponent  {
  public selectedValue1 = '';
   selectedList1: data[] = [
     { value: 'Option1' },
     { value: 'Option2' },
     
   ];
 
   option = 'Select';
}
