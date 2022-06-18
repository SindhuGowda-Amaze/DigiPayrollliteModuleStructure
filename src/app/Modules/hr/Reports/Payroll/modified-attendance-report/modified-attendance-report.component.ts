import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modified-attendance-report',
  templateUrl: './modified-attendance-report.component.html',
  styleUrls: ['./modified-attendance-report.component.css']
})
export class ModifiedAttendanceReportComponent implements OnInit {

  shiftdetails: any;
  data: any;
  loader: any;
  currentUrl: any;
  roleid: any
  staffID: any;
  startingTime1: any;
  endTime1: any;
  attendancelist: any;
  startdate: any;
  enddate: any



  constructor(public DigiofficeService: DigipayrollserviceService) { }

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.loader = true;
    this.roleid = sessionStorage.getItem('roledid');
    this.staffID = sessionStorage.getItem('staffid');
    this.GetAttendance();
  }

  public GetAttendance() {
    debugger
    this.DigiofficeService.GetModifiedAttendance()
      .subscribe({
        next: data => {
          debugger
          this.attendancelist = data
          this.loader = false;
        }, error: (err) => {
          Swal.fire('Issue in Getting City Type');
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
    this.DigiofficeService.GetAttendanceConfiguration()


      .subscribe({
        next: data => {
          debugger
          let temp: any = data;
          if (temp.length != 0) {
            this.startingTime1 = temp[0].startingTime;
            this.endTime1 = temp[0].endTime;
          } else {
            this.startingTime1 = '10:00';
            this.endTime1 = '19:00';
          }
        }, error: (err) => {
          Swal.fire('Issue in Getting AttendanceConfiguration');
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


  public getenddate() {
    debugger
    if (this.roleid == 1) {
      this.DigiofficeService.GetModifiedAttendance()


        .subscribe({
          next: data => {
            debugger
            this.attendancelist = data.filter(x => (x.filterdate >= this.startdate && x.filterdate <= this.enddate))
          }, error: (err) => {
            Swal.fire('Issue in Getting ModifiedAttendance');
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
    else {
      this.DigiofficeService.GetModifiedAttendance()
        .subscribe({
          next: data => {
            debugger
            this.attendancelist = data.filter(x => (x.filterdate >= this.startdate && x.filterdate <= this.enddate))
          }, error: (err) => {
            Swal.fire('Issue in Getting ModifiedAttendance');
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

  }





}