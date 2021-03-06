import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-attendance-config-form',
  templateUrl: './attendance-config-form.component.html',
  styleUrls: ['./attendance-config-form.component.css']
})

export class AttendanceConfigFormComponent implements OnInit {

  constructor(public DigipayrollServiceService: DigipayrollserviceService, private activatedroute: ActivatedRoute, private datepipe: DatePipe) { }
  loader: any;
  ID: any;
  leavelist: any;
  Short: any;
  Description: any;
  startingTime: any;
  endTime: any;
  earlyCheckInTime: any;
  gracePeriod: any;
  underTime: any;
  regularization: any;
  result: any;
  id: any;
  currentUrl: any;
  Holiday: any
  HolidayDescription: any;
  HolidayDate: any;
  LeaveTypeList: any;
  public LeaveType: any
  shiftid: any;
  public attachments21: any = [];
  public attachments: any = [];
  public attachmentsurl: any = [];

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.loader = true;
    this.GetLeaveType();
    this.GetAttendanceConfiguration();
    this.ActivatedRouteCall();
  }

  public ActivatedRouteCall() {
    this.activatedroute.params.subscribe(params => {
      debugger;
      this.ID = params['id'];
      if (this.ID == undefined) {
        this.Holiday = '',
          this.HolidayDescription = ''
      }
      else {
        this.DigipayrollServiceService.GetAttendanceConfiguration()
          .subscribe({
            next: data => {
              debugger
              this.leavelist = data.filter(x => x.id == this.ID);
              this.startingTime = this.leavelist[0].startingTime;
              this.endTime = this.leavelist[0].endTime;
              this.earlyCheckInTime = this.leavelist[0].earlyCheckInTime
              this.gracePeriod = this.leavelist[0].gracePeriod
              this.underTime = this.leavelist[0].underTime,
                this.regularization = this.leavelist[0].regularization
            }, error: (err) => {
              Swal.fire('Issue in Getting Attendance Configuration');
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
        this.loader = false;
      }
    })
  }

  OnSubmit() {
    debugger
    if (this.shiftid == undefined || this.startingTime == " " || this.startingTime == undefined || this.endTime == " " || this.endTime == undefined ||
      this.earlyCheckInTime == " " || this.earlyCheckInTime == undefined || this.gracePeriod == 0 || this.gracePeriod == undefined ||
      this.regularization == " " || this.regularization == undefined) {
      Swal.fire('Please Fill All Mandatory Fields')
    }
    else {
      var json = {
        "shiftid": this.shiftid,
        "StartingTime": this.startingTime,
        "EndTime": this.endTime,
        "EarlyCheckInTime": this.earlyCheckInTime,
        "GracePeriod": this.gracePeriod,
        "UnderTime": this.underTime,
        "Regularization": this.regularization
      };
      this.DigipayrollServiceService.InsertAttendanceConfiguration(json)
        .subscribe({
          next: data => {
            debugger
            Swal.fire('Added Successfully');
            location.href = "#/Attendanceconfigdash";
          }, error: (err) => {
            Swal.fire('Issue in Inserting Attendance Configuration');
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
  }

  GetAttendanceConfiguration() {
    this.DigipayrollServiceService.GetAttendanceConfiguration()
      .subscribe({
        next: data => {
          debugger
          this.result = data;
          this.result = this.result.filter((x: { id: any; }) => x.id == Number(this.id));
          this.shiftid = this.result[0].shiftid;
          this.startingTime = this.result[0].StartingTime;
          this.endTime = this.result[0].EndTime;
          this.earlyCheckInTime = this.result[0].EarlyCheckInTime;
          this.gracePeriod = this.result[0].GracePeriod;
          this.underTime = this.result[0].UnderTime;
          this.regularization = this.result[0].Regularization;
        }, error: (err) => {
          Swal.fire('Issue in Getting Attendance Configuration');
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
    this.loader = false;
  }

  onRemove21(event: any) {
    debugger
    console.log(event);
    this.attachments21.splice(this.attachments.indexOf(event), 1);
  }

  onSelect21(event: any) {
    debugger
    console.log(event);
    this.attachments21.push(...event.addedFiles);
    Swal.fire('Attachment Added Successfully');
  }

  public Save() {
    debugger
    Swal.fire('Please fill All data')
    this.DigipayrollServiceService.ProjectAttachments(this.attachments21)
      .subscribe({
        next: res => {
          debugger
          this.attachmentsurl.push(res);
          this.attachments.length = 0;
          this.loader = false;
        }, error: (err) => {
          Swal.fire('Issue in Inserting Project Attachments');
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

  public UpdateHolidays() {
    debugger;
    if (this.shiftid == undefined || this.startingTime == " " || this.startingTime == undefined || this.endTime == " " || this.endTime == undefined ||
      this.earlyCheckInTime == " " || this.earlyCheckInTime == undefined || this.gracePeriod == 0 || this.gracePeriod == undefined ||
      this.regularization == " " || this.regularization == undefined) {
      Swal.fire('Please Fill All Mandatory Fields')
    }
    else {
      var entity = {
        "ID": this.ID,
        "shiftid": this.shiftid,
        "StartingTime": this.startingTime,
        "EndTime": this.endTime,
        "EarlyCheckInTime": this.earlyCheckInTime,
        "GracePeriod": this.gracePeriod,
        "UnderTime": this.underTime,
        "Regularization": this.regularization
      }
      this.DigipayrollServiceService.UpdateAttendanceConfiguration(entity)
        .subscribe({
          next: data => {
            debugger
            Swal.fire("Updated Successfully");
            location.href = "#/Attendenceconfigdash";
            this.loader = false;
          }, error: (err) => {
            Swal.fire('Issue in Updating Attendance Configuration');
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
  }

  public GetLeaveType() {
    debugger
    this.DigipayrollServiceService.GetLeaveType()
      .subscribe({
        next: data => {
          debugger
          this.LeaveTypeList = data;
          this.loader = false;
        }, error: (err) => {
          Swal.fire('Issue in Getting Leave Type');
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

}