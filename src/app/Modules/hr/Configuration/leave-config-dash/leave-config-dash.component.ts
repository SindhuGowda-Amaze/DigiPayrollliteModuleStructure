import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-leave-config-dash',
  templateUrl: './leave-config-dash.component.html',
  styleUrls: ['./leave-config-dash.component.css']
})

export class LeaveConfigDashComponent implements OnInit {

  constructor(public DigipayrollServiceService: DigipayrollserviceService) { }
  loader:any;
  term: any;
  holidaylist: any;
  currentUrl:any;
  file: any;

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.loader=true;
    this.GetHolidays();
  }
 
  public GetHolidays() {
    debugger
    this.DigipayrollServiceService.GetLeaveConfiguration()
    .subscribe({
      next: data => {
        debugger
        this.holidaylist = data
        this.loader=false;
      }, error: (err) => {
        Swal.fire('Issue in Getting Leave Configuration');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
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
        this.DigipayrollServiceService.DeleteLeaveConfiguration(ID)
        .subscribe({
          next: data => {
            debugger
            Swal.fire('Deleted Successfully')
            this.ngOnInit();
          }, error: (err) => {
            Swal.fire('Issue in Deleting Leave Configuration');
            // Insert error in Db Here//
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message
            }
            this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
              data => {
                debugger
              },
            )
          }
        })
      }
    })
  }
 
  public getmedicalUrl(file: any) {
    debugger
    this.file = file;
  }

}