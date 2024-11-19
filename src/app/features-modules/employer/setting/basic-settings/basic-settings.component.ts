import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';
interface data {
  value: string;
}
@Component({
  selector: 'app-basic-settings',
  templateUrl: './basic-settings.component.html',
  styleUrls: ['./basic-settings.component.scss']
})
export class BasicSettingsComponent  {
  public selectedValue1 = '';
  public selectedValue2 = '';
  public selectedValue3 = '';
  public selectedValue4 = '';
  selectedList1: data[] = [
    { value: 'Select' },
    { value: 'UK' },
    { value: 'USA' },
  ];
  selectedList3: data[] = [
    { value: 'France' },
    { value: 'USA' },
    { value: 'India' },
    { value: 'London' },
  ];
  selectedList2: data[] = [
    { value: 'California' },
    { value: 'Tasmania' },
    { value: 'Auckland' },
    { value: 'Marlborough' },
  ];
  selectedList4: data[] = [
    { value: 'Select' },
    { value: 'Intermediate' },
    { value: 'Export' },
  ];
  showCheckoutHour = true; 

  toggleCheckoutHour() {
    this.showCheckoutHour = !this.showCheckoutHour;
  }
  public isCheckboxChecked = true;
  constructor(private router: Router,private datePipe: DatePipe) {}
  ngsubmit(){
    this.router.navigate([routes.projectconfirmation])
  }
  showTimePicker: Array<string> = [];

  public hoursArray1 = [0];
  public hoursArray2 = [0];
  public hoursArray3 = [0];
  public hoursArray4 = [0];
  public hoursArray5 = [0];
  public hoursArray6 = [0];
  public hoursArray7 = [0];

  startTime1 = new Date();
  startTime2 = new Date();
  startTime3 = new Date();
  startTime4 = new Date();
  startTime5 = new Date();
  startTime6 = new Date();
  startTime7 = new Date();
  endTime1 = new Date();
  endTime2 = new Date();
  endTime3 = new Date();
  endTime4 = new Date();
  endTime5 = new Date();
  endTime6 = new Date();
  endTime7 = new Date();
  


  toggleTimePicker(value: string): void {
    if (this.showTimePicker[0] !== value) {
      this.showTimePicker[0] = value;
    } else {
      this.showTimePicker = [];
    }
  }
  formatTime(date: Date) {
    const selectedDate: Date = new Date(date);
    return this.datePipe.transform(selectedDate, 'h:mm a');
  }
}
