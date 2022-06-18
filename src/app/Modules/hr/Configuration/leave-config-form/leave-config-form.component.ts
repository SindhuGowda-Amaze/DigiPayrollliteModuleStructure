import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-leave-config-form',
  templateUrl: './leave-config-form.component.html',
  styleUrls: ['./leave-config-form.component.css']
})

export class LeaveConfigFormComponent implements OnInit {

  constructor(public DigipayrollServiceService: DigipayrollserviceService, private activatedroute: ActivatedRoute, private datepipe: DatePipe) { }
  ID: any;
  leavelist: any;
  Short: any;
  Description: any;
  result: any;
  LeaveCategory: any;
  currentUrl: any;
  Two_Level_Approval: any;
  HRApproval: any;
  Holiday: any
  ManagerApproval: any;
  HolidayDescription: any;
  HolidayDate: any;
  Attachment: any;
  Gender: any;
  MaritalStatus: any;
  MaxChildren: any;
  MaxRemainingLeaveBal: any;
  AllowedDuringNotice: any;
  MonthlyLimit: any;
  YearlyLimit: any;
  IsCashable: any;
  MonthlyCapping: any;
  AllowForNextYear: any;
  AutoApproval: any;
  IsSickLeaveEligible: any;
  IsTenureLeaveEligible: any;
  IsAnnualLeaveEligible: any;
  LeaveCategoryname: any;
  LeaveTypeList: any;
  public LeaveType: any
  public attachments21: any = [];
  public attachments: any = [];
  public attachmentsurl: any = [];

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.GetLeaveType();
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
        this.DigipayrollServiceService.GetLeaveConfiguration()
          .subscribe({
            next: data => {
              debugger
              this.result = data.filter(x => x.id == this.ID);
              this.LeaveCategory = this.result[0].leaveCategory;
              this.GetLeaveType();
              this.Description = this.result[0].description;
              this.Gender = this.result[0].gender;
              this.MaritalStatus = this.result[0].maritalStatus;
              this.MaxChildren = this.result[0].maxChildren;
              this.MaxRemainingLeaveBal = this.result[0].maxRemainingLeaveBal;
              this.AllowedDuringNotice = this.result[0].allowedDuringNotice;
              this.MonthlyLimit = this.result[0].monthlyLimit;
              this.YearlyLimit = this.result[0].yearlyLimit;
              this.IsCashable = this.result[0].isCashable;
              this.MonthlyCapping = this.result[0].monthlyCapping;
              this.AllowForNextYear = this.result[0].allowForNextYear;
              this.AutoApproval = this.result[0].autoApproval;
              this.IsSickLeaveEligible = this.result[0].isSickLeaveEligible;
              this.IsTenureLeaveEligible = this.result[0].isTenureLeaveEligible;
              this.IsAnnualLeaveEligible = this.result[0].isAnnualLeaveEligible;
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
    })
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

  public InsertHolidays() {
    debugger;
    if (this.LeaveCategory == undefined || this.MonthlyLimit == undefined || this.YearlyLimit == undefined) {
      Swal.fire('Please fill all the fields')
    }
    else {
      var entity = {
        LeaveCategory: this.LeaveCategory,
        Description: this.Description,
        Gender: this.Gender,
        MaritalStatus: this.MaritalStatus,
        MaxChildren: this.MaxChildren,
        MaxRemainingLeaveBal: this.MaxRemainingLeaveBal,
        AllowedDuringNotice: this.AllowedDuringNotice,
        MonthlyLimit: this.MonthlyLimit,
        YearlyLimit: this.YearlyLimit,
        IsCashable: this.IsCashable,
        MonthlyCapping: this.MonthlyCapping,
        AllowForNextYear: this.AllowForNextYear,
        AutoApproval: this.AutoApproval,
        IsTenureLeaveEligible: this.IsTenureLeaveEligible,
        IsAnnualLeaveEligible: this.IsAnnualLeaveEligible,
        LeaveCategoryName: this.LeaveCategoryname
      }
      this.DigipayrollServiceService.InsertLeaveConfiguration(entity)
        .subscribe({
          next: data => {
            debugger
            Swal.fire("Saved Successfully");
            location.href = "#/Leaveconfigurationdash"
          }, error: (err) => {
            Swal.fire('Issue in Inserting Leave Configuration');
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

  public UpdateHolidays() {
    debugger;
    var entity = {
      ID: this.ID,
      LeaveCategory: this.LeaveCategory,
      Description: this.Description,
      Gender: this.Gender,
      MaritalStatus: this.MaritalStatus,
      MaxChildren: this.MaxChildren,
      MaxRemainingLeaveBal: this.MaxRemainingLeaveBal,
      AllowedDuringNotice: this.AllowedDuringNotice,
      MonthlyLimit: this.MonthlyLimit,
      YearlyLimit: this.YearlyLimit,
      IsCashable: this.IsCashable,
      MonthlyCapping: this.MonthlyCapping,
      AllowForNextYear: this.AllowForNextYear,
      Approval: this.AutoApproval,
      IsTenureLeaveEligible: this.IsTenureLeaveEligible,
      IsAnnualLeaveEligible: this.IsAnnualLeaveEligible,
      LeaveCategoryName: this.LeaveCategoryname
    }
    this.DigipayrollServiceService.UpdateLeaveConfiguration(entity)
      .subscribe({
        next: data => {
          debugger
          Swal.fire("Updated Successfully");
          location.href = "#/Leaveconfigurationdash"
        }, error: (err) => {
          Swal.fire('Issue in Updating Leave Configuration');
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

  public GetLeaveType() {
    debugger
    this.DigipayrollServiceService.GetLeaveType()
      .subscribe({
        next: data => {
          debugger
          this.LeaveTypeList = data.filter(x => x.active == 0);
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

  public GetLeaveName() {
    this.DigipayrollServiceService.GetLeaveType()
      .subscribe({
        next: data => {
          debugger
          this.LeaveTypeList = data.filter(x => x.id == this.LeaveCategory);
          this.LeaveCategoryname = this.LeaveTypeList[0].short
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