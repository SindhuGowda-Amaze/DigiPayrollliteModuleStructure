import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
@Component({
  selector: 'app-attendance-config-dash',
  templateUrl: './attendance-config-dash.component.html',
  styleUrls: ['./attendance-config-dash.component.css']
})

export class AttendanceConfigDashComponent implements OnInit {

  constructor(public DigiofficeService: DigipayrollserviceService) { }
  Search: any;
  loader: any;
  AttendConfiglist: any
  date: any;
  currentUrl: any;

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.loader = true;
    this.GetAttendanceConfiguration();
  }

  public GetAttendanceConfiguration() {
    debugger
    this.DigiofficeService.GetAttendanceConfiguration()
      .subscribe({
        next: data => {
          debugger
          this.AttendConfiglist = data;
          this.loader = false;
        }, error: (err) => {
          Swal.fire('Issue in Getting Attendance Configuration');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
  }

  public DeleteAttendanceConfiguration(ID: any) {
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
        this.DigiofficeService.DeleteAttendanceConfiguration(ID)
          .subscribe({
            next: data => {
              debugger
              Swal.fire('Deleted Successfully...!')
              location.reload();
              this.loader = false;
            }, error: (err) => {
              Swal.fire('Issue in Deleting Attendance Configuration');
              // Insert error in Db Here//
              var obj = {
                'PageName': this.currentUrl,
                'ErrorMessage': err.error.message
              }
              this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                data => {
                  debugger
                },
              )
            }
          })
      }
    })
  }

}