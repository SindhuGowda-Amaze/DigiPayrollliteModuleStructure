import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FullCalendarOptions, EventObject } from 'ngx-fullcalendar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-team-leavedetails',
  templateUrl: './my-team-leavedetails.component.html',
  styleUrls: ['./my-team-leavedetails.component.css']
})
export class MyTeamLeavedetailsComponent implements OnInit {
  currentUrl: any;
  IntID: boolean = false;
  public ID: any = [];
  temp: any
  password1: any;
  supervisoremail: any;
  employeename: any;
  employeeemail: any;
  term: any;
  staffleaves: any;
  staffleaves1: any;
  leaveconfig: any;
  leaveTypeID: any;
  autoApproval: any;
  id: any;
  edate: any;
  sdte: any;
  Notes: any;
  staffleaves3:any;


  constructor(public DigiofficeService: DigipayrollserviceService, public router: Router, public datePipe: DatePipe) { }
  public showorhidecontent: any;
  options: FullCalendarOptions | undefined;
  events: EventObject[] | undefined;
  roleid: any;
  public selectedlanguage: any;
  public selectedlanguage1: any;
  public callenderyear: any;
  public callenderMonth: any;
  public callenderstartday: any;
  public callenderendday: any;
  public callenderdaysdount: any = [];
  public callenderBindData = new Date();
  public todaydate = new Date().getDate();
  public options1: any;
  public todayDay = this.datePipe.transform(new Date().getDay(), 'EEEE');
  public selecallbtn: any;
  approved: any;
  roledid: any;
  month: any;
  viewMode = 'tab1';
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.approved = 0
    this.selecallbtn = false;
    this.month = new Date().getMonth();
    this.roledid = sessionStorage.getItem('roledid');
    this.getstaffleaves();
  }


  public getstaffleaves() {
    debugger
    this.DigiofficeService.GetStaffLeaves(10331, 1, "01-01-2020", "01-01-2025")

      .subscribe({
        next: data => {
          debugger
          this.staffleaves = data.filter((x: { supervisor: string | null; status: string }) => x.supervisor == sessionStorage.getItem('staffid') && x.status != 'Manager Pending HR Pending' && x.status != 'Manager Pending'|| x.status == 'Manager Approved' );
          this.staffleaves1 = data.filter((x: { supervisor: string | null; status: any }) => x.supervisor == sessionStorage.getItem('staffid') && (x.status == 'Manager Pending HR Pending' || x.status == 'Manager Pending' || x.status == 'Cancellation Pending'));
          this.staffleaves3 = data.filter(x =>  x.supervisor ==sessionStorage.getItem('staffid') && x.status == 'Manager Rejected');
          this.buildcallender(this.staffleaves);
        }, error: (err) => {
          Swal.fire('Issue in Getting StaffLeaves');
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


  public Approved() {
    this.approved = 1
  }

  public Pending() {
    this.approved = 0
  }

  selectALL(checked: boolean) { // pass true or false to check or uncheck all

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
        'Status1': 'Manager Approved',
        'UserID': this.ID[i].staffID,
        'LeaveTypeID': this.ID[i].leaveTypeID,
        'NoOfDays': this.ID[i].noOfDays

      }
      this.DigiofficeService.ApproveStaffLeavesNew(entity)

        .subscribe({
          next: data => {
            debugger
            if (data != 0) {
              Swal.fire("Approved Successfully");
              this.ngOnInit();

            }
          }, error: (err) => {
            Swal.fire('Issue in Getting StaffLeavesNew');
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
    this.ngOnInit();
  }

  public ManagerLeaveApprove(id: any) {
    debugger

    if (id.status == 'Manager Pending') {
      var entity = {
        'ID': id.id,
        'Status1': 'Manager Approved',
        'StaffName': id.staffID,
        'LeaveTypeID': id.leaveTypeID,
        'NoOfDays': id.noOfDays,

      }
      this.DigiofficeService.ApproveStaffLeavesNew(entity)

        .subscribe({
          next: data => {
            debugger
            if (data != 0) {
              Swal.fire("Approved Successfully");
              this.getpassword('Approved', id.staffID)
              this.ngOnInit();

            }
          }, error: (err) => {
            Swal.fire('Issue in Getting StaffLeavesNew');
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
    else if (id.status == 'Cancellation Pending') {
      var entity = {
        'ID': id.id,
        'Status1': 'Manager Approved',
        'StaffName': id.staffID,
        'LeaveTypeID': id.leaveTypeID,
        'NoOfDays': id.noOfDays,

      }

      this.DigiofficeService.ApproveCancelledLeave(entity)


        .subscribe({
          next: data => {
            debugger
            Swal.fire('Cancelled Successfully');
            this.getpassword('Cancellation Approved', id.staffID)
            this.ngOnInit();
          }, error: (err) => {
            Swal.fire('Issue in Getting CancelledLeave');
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
  date: any;
  public getdate() {
    debugger
    // this.date = event.target.value;

    // this.DigiofficeService.GetStaffLeaves(10331, 1, "01-01-2020", "01-01-2025").subscribe((data: any) => {
    //   debugger
    //   this.staffleaves = data.filter((x: { supervisor: string | null; filterdate: any; }) => x.supervisor == sessionStorage.getItem('staffid') && x.filterdate == this.date);
    // })

    this.DigiofficeService.GetStaffLeaves(10331, 1, "01-01-2020", "01-01-2025")


      .subscribe({
        next: data => {
          debugger
          this.staffleaves1 = data.filter((x: { supervisor: string | null; status: string, month: string, endmonth: string }) => x.supervisor == sessionStorage.getItem('staffid') && x.status == 'Manager Pending HR Pending' || x.status == 'Manager Pending' && x.month == (this.month + 1));
        }, error: (err) => {
          Swal.fire('Issue in Getting StaffLeaves');
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

  public ManagerLeaveDecline() {
    debugger
    var entity = {
      'ID': this.id,
      'LeaveReason': 'Rejected',
      'Status1': 'Rejected',
      'StartDate': this.sdte,
      'EndDate': this.edate,
    }
    this.DigiofficeService.UpdateStaffLeaves(entity)

      .subscribe({
        next: data => {
          debugger
          if (data != 0) {
            Swal.fire("Rejected Successfully");
            this.getpassword('Rejected', this.id)
            location.reload();

          }

        }, error: (err) => {
          Swal.fire('Issue in Getting StaffLeaves');
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

  medicalUrl: any
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
      //  this.ID = [];
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


  changeStatus(evn: any) {

    if (evn.target.value == 1) {
      this.showorhidecontent = true;

    }
    else {
      this.showorhidecontent = false;
    }

  }

  public alldates: any = [];

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
            this.callenderdaysdount[currenteventlist[0].date - 1]['mantainenceHtml'] =
            // "<span class='event_PendingBookCommunity'> Leave ID : " + MaintainanceList[j].id +
            "<br>  Staff Name  :" + MaintainanceList[j].staffName + " <br> "
          // "<br>  Reason : " + MaintainanceList[j].leaveReason +
          "</span>";
        }
      }


    }
  }
  staffleaves2: any;
  date234: any;
  changeStatus1(date: any) {
    this.DigiofficeService.GetStaffLeaves(10331, 1, "01-01-2020", "01-01-2025")


      .subscribe({
        next: data => {
          debugger
          this.staffleaves2 = data.filter((x: { supervisor: string | null, sdate: string; edate: string }) => x.supervisor == sessionStorage.getItem('staffid') && x.sdate >= date && date <= x.edate);
          this.date234 = date
        }, error: (err) => {
          Swal.fire('Issue in Getting StaffLeaves');
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
        '</p>'
      ,
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: true,

    }));



  }


  getpassword(status: any, staffid: any) {
    debugger;
    this.DigiofficeService.GetMyDetails()
      .subscribe({
        next: data => {
          debugger
          let temp: any = data.filter(x => x.id == staffid);
          if (temp.length != 0) {
            this.employeeemail = temp[0].official_Email;
            this.employeename = temp[0].name;
            this.sendemail(status);
          }
        }, error: (err) => {
          Swal.fire('Issue in Getting MyDetails');
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

  public Attactments = [];
  public sendemail(status: any) {
    var entity1 = {
      'emailto': this.employeeemail,
      'emailsubject': 'Leave Application',
      'emailbody': 'Hi , <br> ' + this.employeename + ' your leave request is ' + status + ' by your supervior , Please Login to Digioffice To View It.<br> Thanks <br> Team Digi-Office',
      'attachmenturl': this.Attactments,
      'cclist': this.employeeemail,
      'bcclist': this.employeeemail,
    }
    this.DigiofficeService.sendemail1(entity1)

      .subscribe({
        next: data => {
          debugger
          this.Attactments = [];
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

  }



  // public ShowMaintenanceRequest(evn: any) {
  //   debugger;
  //   var html = evn.srcElement.innerText.split(': ');
  //   var s1 = html[1].substring(0, html[1].indexOf('\n'));
  //   let MaintenanceRequest = this.staffleaves.filter((x: { id: string; }) => x.id == s1);
  //   Swal.fire(({
  //     title: '<strong><u>Leave Details</u></strong>',
  //     type: 'info',
  //     html:
  //       '<p style="font-size: 24px;text-align: start;margin-left: 135px;"> Staff Name : ' + MaintenanceRequest[0].staffName +
  //       '       <br>' +
  //       'Leave Reason: ' + MaintenanceRequest[0].leaveReason +
  //       '       <br>' +
  //       'Start Date: ' + MaintenanceRequest[0].sDateOfLeave +
  //       '       <br>' +
  //       'End Date: ' + MaintenanceRequest[0].eDateOfLeave +
  //       '       <br>' +
  //       '</p>'
  //     ,
  //     showCloseButton: true,
  //     showCancelButton: false,
  //     focusConfirm: true,

  //   }));


  // }
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




}