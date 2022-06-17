import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';

@Component({
  selector: 'app-holiday-dashboard',
  templateUrl: './holiday-dashboard.component.html',
  styleUrls: ['./holiday-dashboard.component.css']
})
export class HolidayDashboardComponent implements OnInit {

  constructor(public DigipayrollServiceService: DigipayrollserviceService) { }
  p: any = 1;
  count1: any = 10;
  roleid:any;
  holidaylistCopy:any;
  loader:any;
  ngOnInit(): void {
    this.loader=true;
    this.roleid = sessionStorage.getItem('roledid');
    this.GetHolidays();
  }
  term:any;
  holidaylist: any
  public GetHolidays() {
    debugger
    this.DigipayrollServiceService.GetHolidays().subscribe(data => {
      debugger
      this.holidaylist = data
      this.holidaylistCopy= this.holidaylist
      this.loader=false;
    })
  }

  public DeleteHolidays(ID: any) {
    debugger
    Swal.fire({
      title: 'Are you sure?',
      text: 'You Want to delete it.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.DigipayrollServiceService.DeleteHolidays(ID).subscribe(data => {
          debugger
          Swal.fire('Deleted Successfully')
          this.ngOnInit();
        })
      }
    })

  }
  file: any;
  public getmedicalUrl(file: any) {
    debugger
    this.file = file;
  }

  public Filterholidays() {
    debugger
    let searchCopy = this.term.toLowerCase();
    this.holidaylist = this.holidaylistCopy.filter((x: { holiday: string }) =>
      x.holiday.toLowerCase().includes(searchCopy));
  }

}