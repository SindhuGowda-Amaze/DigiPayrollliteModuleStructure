import { Component, OnInit } from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { FullCalendarOptions, EventObject } from 'ngx-fullcalendar';
@Component({
  selector: 'app-hrleave-request',
  templateUrl: './hrleave-request.component.html',
  styleUrls: ['./hrleave-request.component.css']
})

export class HRLeaveRequestComponent implements OnInit {

  constructor(public DigiofficeService: DigipayrollserviceService, public router: Router, public datePipe: DatePipe) { }
  public selecallbtn: any;
  public filtereddate: any;
  public todaydate: any;
  public firstdayofcurrentyear: any;
  public firstdayofcurrentweek: any;
  public lastdayofcurrentweek: any;
  public firstdayofpreviousmonth: any;
  public lastdayofpreviousmonth: any;
  public firstdayofpreviousyear: any;
  public lastdayofpreviousyear: any;
  firstDayofcurrentmonth: any;
  public showorhidecontent: any;
  options: FullCalendarOptions | undefined;
  events: EventObject[] | undefined;
  roleid: any;
  currentUrl: any;
  loader: any;
  roledid: any;
  p: any = 1;
  RoleType: any;
  count1: any = 10;
  Departmentlist: any;
  RoleTypeList: any;
  term: any;
  staffleaves: any;
  staffListCopy: any;
  stafflist: any;
  count: any;
  Department: any;
  sdate: any;
  edate: any;
  id: any;
  sdte: any;
  temp: any
  Notes: any;
  medicalUrl: any;
  staffleaves1: any;
  IntID: boolean = false;
  public ID: any = [];
  public selectedlanguage: any;
  public selectedlanguage1: any;
  public callenderyear: any;
  public callenderMonth: any;
  public callenderstartday: any;
  public callenderendday: any;
  public callenderdaysdount: any = [];
  public callenderBindData = new Date();
  public options1: any;
  public alldates: any = [];
  public todayDay = this.datePipe.transform(new Date().getDay(), 'EEEE');

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.loader = true;
    this.RoleType = "";
    this.Department = "";
    this.selecallbtn = false;
    this.getstaffleaves();
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.filtereddate = formatDate(myDate, format, locale);
    this.todaydate = this.filtereddate;
    this.firstDayofcurrentmonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    this.firstDayofcurrentmonth = formatDate(this.firstDayofcurrentmonth, format, locale);
    this.firstdayofcurrentyear = new Date(new Date().getFullYear(), 0, 1);
    this.firstdayofcurrentyear = formatDate(this.firstdayofcurrentyear, format, locale);
    this.roledid = sessionStorage.getItem('roledid');
    this.GetDepartment();
    this.GetRoleType();
    this.getstaffleaves();
  }

  public GetRoleType() {
    this.DigiofficeService.GetRoleType()
      .subscribe({
        next: data => {
          debugger
          this.RoleTypeList = data;
        }, error: (err) => {
          Swal.fire('Issue in Getting Role Type');
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

  public GetDepartment() {
    this.DigiofficeService.GetDepartment()
      .subscribe({
        next: data => {
          debugger
          this.Departmentlist = data;
        }, error: (err) => {
          Swal.fire('Issue in Getting Department');
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

  public Getendate() {
    debugger
    if (this.sdate > this.edate) {
      Swal.fire('Start date must be less than End Date')
    } else {
      this.DigiofficeService.GetStaffLeaves(10331, 1, this.sdate, this.edate)
        .subscribe({
          next: data => {
            debugger
            this.staffleaves = data.filter((x: { status: string; supervisor: string }) => x.status == 'Manager Approved' || x.supervisor == null || x.status == 'Manager Approved HR Rejected' || x.status == 'Manager Pending HR Rejected' || x.status == 'Manager Approved HR Approved')
            this.buildcallender(this.staffleaves);
          }, error: (err) => {
            Swal.fire('Issue in Getting Staff Leaves');
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

  changeStatus1() {
    debugger;
    this.showorhidecontent = true;
  }

  changeStatus(evn: any) {
    if (evn.target.value == 1) {
      this.showorhidecontent = true;
    }
    else {
      this.showorhidecontent = false;
    }
  }

  public buildcallender(MaintainanceList: string | any[]) {
    debugger
    this.callenderdaysdount.length = 0;
    this.callenderyear = this.callenderBindData.getFullYear();
    this.callenderMonth = this.datePipe.transform(this.callenderBindData, 'MMMM');
    this.callenderstartday = new Date(this.callenderBindData.getFullYear(), this.callenderBindData.getMonth(), 1);
    this.callenderendday = new Date(this.callenderBindData.getFullYear(), this.callenderBindData.getMonth() + 1, 0);
    this.callenderdaysdount.length = this.callenderendday.getDate();
    let o = 0;
    for (let i = 0; i < this.callenderdaysdount.length; i++) {
      let sdate = this.callenderstartday;
      let _date;
      if (sdate.getDate() == 1 && o == 0) {
        _date = sdate.setDate(sdate.getDate() + 0);
        o++
      }
      else {
        _date = sdate.setDate(sdate.getDate() + 1);
      }
      _date = this.datePipe.transform(sdate, 'dd');
      let _day = this.datePipe.transform(sdate, 'EEE');
      let dateformat = this.datePipe.transform(sdate, 'yyyy-MM-ddTHH:mm:ss');
      this.callenderdaysdount[i] = { date: _date, day: _day, dateformat: dateformat };
    }
    //Events Binding
    const getDatesBetweenDates = (startDate: string | number | Date, endDate: string | number | Date) => {
      let dates: any = []
      //to avoid modifying the original date
      const theDate = new Date(startDate)
      while (theDate < new Date(endDate)) {
        dates = [...dates, new Date(theDate)]
        theDate.setDate(theDate.getDate() + 1)
      }
      dates = [...dates, new Date(endDate)]
      this.alldates = dates;
      return dates
    }
    for (let j = 0; j < MaintainanceList.length; j++) {
      debugger;
      getDatesBetweenDates(MaintainanceList[j].filterdate, MaintainanceList[j].filterdate1)
      for (let k = 0; k < this.alldates.length; k++) {
        let currenteventlist = this.callenderdaysdount.filter((x: { dateformat: number; }) => (this.datePipe.transform(x.dateformat, 'yyyy-MM-dd') == this.datePipe.transform(this.alldates[k], 'yyyy-MM-dd')))
        if (currenteventlist.length > 0) {
          this.callenderdaysdount[currenteventlist[0].date - 1]['RequestFor'] = MaintainanceList[j].requestFor;
          this.callenderdaysdount[currenteventlist[0].date - 1]['StartTime'] = MaintainanceList[j].startTime;
          this.callenderdaysdount[currenteventlist[0].date - 1]['EndTime'] = MaintainanceList[j].endTime;
          this.callenderdaysdount[currenteventlist[0].date - 1]['mantainenceHtml'] =
            "<br>  Staff Name  :" + MaintainanceList[j].staffName + " <br>  "
          "</span>";
        }
      }
    }
  }

  public ShowMaintenanceRequest(evn: any) {
    debugger;
    var html = evn.srcElement.innerText.split(': ');
    var s1 = html[1].substring(0, html[1].indexOf('\n'));
    let MaintenanceRequest = this.staffleaves.filter((x: { id: string; }) => x.id == s1);
    Swal.fire(({
      title: '<strong><u>Leave Details</u></strong>',
      icon: 'info',
      html:
        '<p style="font-size: 24px;text-align: start;margin-left: 135px;"> Staff Name : ' + MaintenanceRequest[0].staffName +
        '       <br>' +
        'Leave Reason: ' + MaintenanceRequest[0].leaveReason +
        '       <br>' +
        'Start Date: ' + MaintenanceRequest[0].sDateOfLeave +
        '       <br>' +
        'End Date: ' + MaintenanceRequest[0].eDateOfLeave +
        '       <br>' +
        '</p>',
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: true,
    }));
  }

  public previousmonth() {
    debugger;
    this.callenderBindData.setMonth(this.callenderBindData.getMonth() - 1);
    this.buildcallender(this.staffleaves);
  }

  public nextmonth() {
    debugger;
    this.callenderBindData.setMonth(this.callenderBindData.getMonth() + 1);
    this.buildcallender(this.staffleaves);
  }

  public getstaffleaves() {
    debugger
    this.DigiofficeService.GetStaffLeaves(10331, 1, "01-01-2020", "01-01-2025")
      .subscribe({
        next: data => {
          debugger
          this.staffleaves = data.filter((x: { status: string; supervisor: string }) => x.status == 'Manager Approved HR Pending' || x.supervisor == null || x.status == 'Manager Approved HR Rejected' || x.status == 'Manager Pending HR Rejected' || x.status == 'Manager Approved HR Approved' || x.status == 'HR Pending' || x.status == 'HR Approved')
          this.staffListCopy = this.staffleaves;
          this.buildcallender(this.staffleaves);
        }, error: (err) => {
          Swal.fire('Issue in Getting Staff Leaves');
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
    this.DigiofficeService.GetStaffLeaves(10331, 1, "01-01-2020", "01-01-2025")
      .subscribe({
        next: data => {
          debugger
          this.staffleaves1 = data.filter((x: { status: string; supervisor: string }) => x.status == 'Manager Approved HR Pending' || x.supervisor == null)
        }, error: (err) => {
          Swal.fire('Issue in Getting Staff Leaves');
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
    this.loader = false
  }

  public newlevae() {
    debugger
    this.router.navigate(['/NewLeaveRequest']);
  }

  public makeunderline(event: { currentTarget: any; }) {
    debugger
    var element = event.currentTarget;
    element.c("color");
    element.addClass("bottom__active");
  };

  public Filterlist() {
    debugger
    let searchCopy = this.term.toLowerCase();
    this.staffleaves = this.staffListCopy.filter((x: { staffName: string }) => x.staffName.toLowerCase().includes(searchCopy));
  }

  public getRoleType(event: any) {
    debugger
    this.RoleType = event.target.value;
  }

  public FilterRoleType() {
    debugger
    this.DigiofficeService.GetStaffLeaves(10331, 1, "01-01-2020", "01-01-2025")
      .subscribe({
        next: data => {
          debugger
          this.staffleaves = data.filter((x: { status: string; supervisor: string; roleType: string }) => (x.status == 'Manager Approved HR Pending' || x.supervisor == null || x.status == 'Manager Approved HR Rejected' || x.status == 'Manager Pending HR Rejected' || x.status == 'Manager Approved HR Approved') && x.roleType == this.RoleType)
          this.count = this.staffleaves.length;
        }, error: (err) => {
          Swal.fire('Issue in Getting Staff Leaves');
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

  public filterByDepartment() {
    debugger
    this.DigiofficeService.GetStaffLeaves(10331, 1, "01-01-2020", "01-01-2025")
      .subscribe({
        next: data => {
          debugger
          this.staffleaves = data.filter((x: { status: string; supervisor: string; department: string }) => (x.status == 'Manager Approved HR Pending' || x.supervisor == null || x.status == 'Manager Approved HR Rejected' || x.status == 'Manager Pending HR Rejected' || x.status == 'Manager Approved HR Approved') && x.department == this.Department)
          this.count = this.staffleaves.length;
        }, error: (err) => {
          Swal.fire('Issue in Getting Staff Leaves');
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

  public ManagerLeaveApprove(id: any) {
    debugger
    if (id.status == 'HR Pending') {
      var entity = {
        'ID': id.id,
        'Status1': 'HR Approved',
        'StaffName': id.staffID,
        'LeaveTypeID': id.leaveTypeID,
        'NoOfDays': id.noOfDays,
      }
      this.DigiofficeService.ApproveStaffLeavesNewForHR(entity)
        .subscribe({
          next: data => {
            debugger
            if (data != 0) {
              Swal.fire("Approved Successfully");
              this.ngOnInit();
            }
          }, error: (err) => {
            Swal.fire('Issue in Approved Staff Leaves New For HR');
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
      var entity = {
        'ID': id.id,
        'Status1': 'Manager Approved HR Approved',
        'StaffName': id.staffID,
        'LeaveTypeID': id.leaveTypeID,
        'NoOfDays': id.noOfDays,
      }
      this.DigiofficeService.ApproveStaffLeavesNewForHR(entity)
        .subscribe({
          next: data => {
            debugger
            if (data != 0) {
              Swal.fire("Approved Successfully");
              this.ngOnInit();
            }
          }, error: (err) => {
            Swal.fire('Issue in Approved Staff Leaves New For HR');
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

  public ManagerLeaveDecline() {
    debugger
    var entity = {
      'ID': this.id,
      'LeaveReason': 'Rejected',
      'Status1': 'Manager Approved HR Rejected',
      'StartDate': this.sdte,
      'EndDate': this.edate,
    }
    this.DigiofficeService.UpdateStaffLeaves(entity)
      .subscribe({
        next: data => {
          debugger
          if (data != 0) {
            Swal.fire("Rejected Successfully");
            location.reload();
          }
        }, error: (err) => {
          Swal.fire('Issue in Updating Staff Leaves');
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

  public GetRejectID(list: any) {
    this.id = list.id;
    this.sdte = list.sdte;
    this.edate = list.edate;
  }

  public getmedicalUrl(medicalUrl: any) {
    debugger
    this.medicalUrl = medicalUrl
  }

  public getCheckbocdetails(evn: any) {
    let temp: any = evn;
    this.temp = Object.entries(temp);
    debugger
    if (this.temp.every((val: { checked: boolean; }) => val.checked == true)) {
      this.IntID = false;
      this.ID = [];
      this.temp.forEach((val: { checked: boolean; }) => { val.checked = false });
      this.IntID = false;
    }
    else {
      debugger;
      this.selecallbtn = true;
      debugger
      this.temp.forEach((val: { checked: boolean; }) => { val.checked = true });
      this.IntID = true;
      var obj: any = {};
      obj["id"] = evn.id;
      obj["staffID"] = evn.staffID;
      obj["leaveTypeID"] = evn.leaveTypeID;
      obj["noOfDays"] = evn.noOfDays;
      this.ID.push(obj);
    }
  }

  selectALL(checked: boolean) { // pass true or false to check or uncheck all
    debugger
    if (this.selecallbtn == true) {
      this.selecallbtn = false;
    }
    else {
      this.selecallbtn = true;
      var inputs = document.getElementsByTagName("input");
      for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type == "checkbox") {
          inputs[i].checked = checked;
          // This way it won't flip flop them and will set them all to the same value which is passed into the function
        }
      }
      for (var i = 0; i < this.staffleaves1.length; i++) {
        debugger
        var obj: any = {};
        obj["id"] = this.staffleaves1[i].id;
        obj["staffID"] = this.staffleaves1[i].staffID;
        obj["leaveTypeID"] = this.staffleaves1[i].leaveTypeID;
        obj["noOfDays"] = this.staffleaves1[i].noOfDays;
        this.ID.push(obj);
      }
    }
  }

  public Approveall() {
    debugger
    for (var i = 0; i < this.ID.length; i++) {
      var entity = {
        'ID': this.ID[i].id,
        'Status1': 'Manager Approved HR Approved',
        'UserID': this.ID[i].staffID,
        'LeaveTypeID': this.ID[i].leaveTypeID,
        'NoOfDays': this.ID[i].noOfDays
      }
      this.DigiofficeService.ApproveStaffLeavesNewForHR(entity)
        .subscribe({
          next: data => {
            debugger
            if (data != 0) {
              Swal.fire("Approved Successfully");
            }
          }, error: (err) => {
            Swal.fire('Issue in Approve New Staff Leaves For HR ');
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
    location.reload();
  }

}