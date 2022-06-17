import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-holiday-dashboard',
  templateUrl: './holiday-dashboard.component.html',
  styleUrls: ['./holiday-dashboard.component.css'],
})
export class HolidayDashboardComponent implements OnInit {
  p: any = 1;
  count1: any = 10;
  roleid: any;
  holidaylistCopy: any;
  loader: any;
  term: any;
  holidaylist: any;
  file: any;
  currentUrl: any;
  constructor(public DigipayrollserviceService: DigipayrollserviceService) {}

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.loader = true;
    this.roleid = sessionStorage.getItem('roledid');
    this.GetHolidays();
  }

  public GetHolidays() {
    debugger;
    this.DigipayrollserviceService.GetHolidays()
    
    .subscribe({
      next: data => {
        this.holidaylist = data;
        this.holidaylistCopy = this.holidaylist;
        this.loader = false;
      }, error: (err) => {
        Swal.fire('Issue in  GetHolidays');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )}
    })
    
  }

  public DeleteHolidays(ID: any) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: 'You Want to delete it.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.DigipayrollserviceService.DeleteHolidays(ID)
        
        .subscribe({
          next: data => {
            debugger
            Swal.fire('Deleted Successfully');
          this.ngOnInit();
          }, error: (err) => {
            Swal.fire('Issue in Deleting Hoilday');
            // Insert error in Db Here//
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message
            }
            this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
              data => {
                debugger
              },
            )}
        })       
        
      }
    });
  }

  public getmedicalUrl(file: any) {
    debugger;
    this.file = file;
  }

  public Filterholidays() {
    debugger;
    let searchCopy = this.term.toLowerCase();
    this.holidaylist = this.holidaylistCopy.filter((x: { holiday: string }) =>
      x.holiday.toLowerCase().includes(searchCopy)
    );
  }
}
