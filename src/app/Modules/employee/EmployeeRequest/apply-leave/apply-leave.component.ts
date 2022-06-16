import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css']
})
export class ApplyLeaveComponent implements OnInit {

  LeaveType: any;
  CoveringStaff: any;
  Staffleaveenitilment: any;
  staffid: any;
  Touser: any;
  roleid: any;
  joinbit: any;
  LeaveTypeList: any;
  SDateOfLeave: any;
  EDateOfLeave: any;
  LeaveReason: any;
  leaveconfig: any;
  lopdays: any;
  halfday: any;
  autoApproval: any;
  HalfDayBit: any;
  password1: any;
  supervisoremail:any;
  employeename:any;

  public newLeaveTypeList: any = [];
  constructor(public DigiofficeService: DigipayrollserviceService, public router: Router) { }

  ngOnInit(): void {
    this.LeaveType = "";
    this.roleid = sessionStorage.getItem('roledid')
    this.staffid = sessionStorage.getItem('staffid');
    this.DigiofficeService.GetMyDetails().subscribe(data => {
      debugger
      this.Staffleaveenitilment = data.filter(x => x.id == sessionStorage.getItem('staffid'));
      this.Touser = this.Staffleaveenitilment[0].supervisor;
      this.joinbit = this.Staffleaveenitilment[0].joinbit;
    });

    this.GetLeaveType();

  }
 


  public GetLeaveType() {
    debugger
    this.DigiofficeService.GetLeaveType().subscribe(data => {
      debugger
      this.LeaveTypeList = data;

      for (let i = 0; i < this.LeaveTypeList.length; i++) {
        debugger
        if (this.LeaveTypeList[i].id == 59) {
          this.DigiofficeService.GetMyDetails().subscribe(data => {
            debugger
            let temp: any = data.filter(x => x.id == sessionStorage.getItem('staffid'));
            if ((temp[0].vacationLeaveEntitlement - temp[0].vacationLeaveTaken) <= 0) {

            }
            else if (this.joinbit == 1) {

            }
            else {
              var obj: any = {};
              obj["id"] = this.LeaveTypeList[i].id;
              obj["short"] = this.LeaveTypeList[i].short;
              this.newLeaveTypeList.push(obj);
            }


          });
        }
        else if (this.LeaveTypeList[i].id == 60) {
          this.DigiofficeService.GetMyDetails().subscribe(data => {
            debugger
            let temp: any = data.filter(x => x.id == sessionStorage.getItem('staffid'));
            if (temp[0].sickLeaveEntitlement - temp[0].sickLeaveTaken <= 0) {

            }
            else if (this.joinbit == 1) {

            }
            else {
              var obj: any = {};
              obj["id"] = this.LeaveTypeList[i].id;
              obj["short"] = this.LeaveTypeList[i].short;
              this.newLeaveTypeList.push(obj);
            }

          });
        }
        else if (this.LeaveTypeList[i].id == 61) {
          debugger
          this.DigiofficeService.GetMyDetails().subscribe(data => {
            debugger
            let temp: any = data.filter(x => x.id == sessionStorage.getItem('staffid'));
            if (temp[0].serviceIncentiveLeaveEntitlement - temp[0].serviceIncentiveLeaveTaken <= 0) {

            }
            else if (temp[0].awardname == 'No Award') {

            }
            else {
              var obj: any = {};
              obj["id"] = this.LeaveTypeList[i].id;
              obj["short"] = this.LeaveTypeList[i].short;
              this.newLeaveTypeList.push(obj);
            }

          });
        }
        else if (this.LeaveTypeList[i].id == 66) {
          debugger
          this.DigiofficeService.GetMyDetails().subscribe(data => {
            debugger
            let temp: any = data.filter(x => x.id == sessionStorage.getItem('staffid'));
            if (temp[0].gynecologicalLeaveEntitlement - temp[0].gynecologicalLeaveTaken <= 0) {

            }
            else if (temp[0].gender == 'Male' || temp[0].status == 'Single') {

            }
            else if (temp[0].gender == 'Female') {
              var obj: any = {};
              obj["id"] = this.LeaveTypeList[i].id;
              obj["short"] = this.LeaveTypeList[i].short;
              this.newLeaveTypeList.push(obj);
            }
          });
        }
        else if (this.LeaveTypeList[i].id == 65) {
          debugger
          this.DigiofficeService.GetMyDetails().subscribe(data => {
            debugger
            let temp: any = data.filter(x => x.id == sessionStorage.getItem('staffid'));
            if (temp[0].violenceLeaveEntitlement - temp[0].violenceLeaveTaken <= 0) {

            }
            else if (temp[0].gender == 'Male' || temp[0].status == 'Single') {

            }
            else if (temp[0].gender == 'Female') {
              var obj: any = {};
              obj["id"] = this.LeaveTypeList[i].id;
              obj["short"] = this.LeaveTypeList[i].short;
              this.newLeaveTypeList.push(obj);
            }
          });
        }
        else if (this.LeaveTypeList[i].id == 63) {
          debugger

          this.DigiofficeService.GetMyDetails().subscribe(data => {
            debugger
            let temp: any = data.filter(x => x.id == sessionStorage.getItem('staffid'));
            if (temp[0].gender == 'Male' && temp[0].status == 'Single') {

            }
            else if (temp[0].maternitityLeaveEntitlement - temp[0].maternitityLeaveTaken <= 0) {

            }
            else if (temp[0].gender == 'Female' && temp[0].status == 'Married') {
              var obj: any = {};
              obj["id"] = this.LeaveTypeList[i].id;
              obj["short"] = this.LeaveTypeList[i].short;
              this.newLeaveTypeList.push(obj);
            }
          });
        }
        else if (this.LeaveTypeList[i].id == 62) {
          debugger
          this.DigiofficeService.GetMyDetails().subscribe(data => {
            debugger
            let temp: any = data.filter(x => x.id == sessionStorage.getItem('staffid'));
            if (temp[0].gender == 'Female' || temp[0].status == 'Single') {

            }
            else if (temp[0].paternitityLeaveEntitlement - temp[0].paternitityLeaveTaken <= 0) {

            }
            else if (temp[0].gender == 'Male' && temp[0].status == 'Married') {
              var obj: any = {};
              obj["id"] = this.LeaveTypeList[i].id;
              obj["short"] = this.LeaveTypeList[i].short;
              this.newLeaveTypeList.push(obj);
            }
          });
        }
        else if (this.LeaveTypeList[i].id == 64) {
          debugger
          this.DigiofficeService.GetMyDetails().subscribe(data => {
            debugger
            let temp: any = data.filter(x => x.id == sessionStorage.getItem('staffid'));
            if (temp[0].soloParentLeaveEntitlement - temp[0].soloParentLeaveTaken <= 0) {

            }
            else if (temp[0].is_Solo_Parent == 1) {
              var obj: any = {};
              obj["id"] = this.LeaveTypeList[i].id;
              obj["short"] = this.LeaveTypeList[i].short;
              this.newLeaveTypeList.push(obj);
            }

          });
        }

        else {
          var obj: any = {};
          obj["id"] = this.LeaveTypeList[i].id;
          obj["short"] = this.LeaveTypeList[i].short;
          this.newLeaveTypeList.push(obj);
        }




      }
    })
  }



  public Save() {
    debugger
    if (this.EDateOfLeave < this.SDateOfLeave) {
      Swal.fire('End Date should be greater than Start Date');
    }
    else if (this.LeaveReason == undefined || this.LeaveType == undefined) {
      Swal.fire('Please Fill All The Mandatory Fields');
    }
    else {
      this.DigiofficeService.ProjectAttachments(this.attachments21).subscribe(res => {
        debugger
        if (res != undefined) {
          this.attachmentsurl.push(res);
          this.attachments.length = 0;
          this.InserStaffLeave()
        }
        debugger
      })
    }


  }

  public CheckLeave() {
    debugger

    if (this.LeaveType == 5) {
      this.DigiofficeService.GetMyDetails().subscribe(data => {
        debugger
        let temp: any = data.filter(x => x.id == sessionStorage.getItem('staffid'));
        if (temp[0].medicalLeaveEntitlement - temp[0].medicalLeaveTaken <= 0) {
          Swal.fire('You Dont have Medical Leave')
        }


      });
    }
    else if (this.LeaveType == 6) {
      this.DigiofficeService.GetMyDetails().subscribe(data => {
        debugger
        let temp: any = data.filter(x => x.id == sessionStorage.getItem('staffid'));
        if (temp[0].marriageLeaveEntitlement - temp[0].marriageLeaveTaken <= 0) {
          Swal.fire('You Dont have Marriage Leave')
        }

      });
    }
    else if (this.LeaveType == 7) {
      debugger
      this.DigiofficeService.GetMyDetails().subscribe(data => {
        debugger
        let temp: any = data.filter(x => x.id == sessionStorage.getItem('staffid'));
        if (temp[0].maternitityLeaveEntitlement - temp[0].maternitityLeaveTaken <= 0) {
          Swal.fire('You Dont have Maternity  Leave')
        }
        if (temp[0].gender == 'Male') {
          Swal.fire('You Can not Apply Maternity  Leave');
        }

      });
    }
  }
  public formatDate(date: any) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  

  public calcBusinessDays(dDate1: any, dDate2: any) { // input given as Date objects
    var iWeeks, iDateDiff, iAdjust = 0;
    if (dDate2 < dDate1) return -1; // error code if dates transposed
    var iWeekday1 = dDate1.getDay(); // day of week
    var iWeekday2 = dDate2.getDay();
    iWeekday1 = (iWeekday1 == 0) ? 7 : iWeekday1; // change Sunday from 0 to 7
    iWeekday2 = (iWeekday2 == 0) ? 7 : iWeekday2;
    if ((iWeekday1 > 5) && (iWeekday2 > 5)) iAdjust = 1; // adjustment if both days on weekend
    iWeekday1 = (iWeekday1 > 5) ? 5 : iWeekday1; // only count weekdays
    iWeekday2 = (iWeekday2 > 5) ? 5 : iWeekday2;

    // calculate differnece in weeks (1000mS * 60sec * 60min * 24hrs * 7 days = 604800000)
    iWeeks = Math.floor((dDate2.getTime() - dDate1.getTime()) / 604800000)

    if (iWeekday1 < iWeekday2) { //Equal to makes it reduce 5 days
      iDateDiff = (iWeeks * 5) + (iWeekday2 - iWeekday1)
    } else {
      iDateDiff = ((iWeeks + 1) * 5) - (iWeekday1 - iWeekday2)
    }

    iDateDiff -= iAdjust // take into account both days on weekend

    return (iDateDiff + 1); // add 1 because dates are inclusive
  }


  public InserStaffLeave() {
    debugger

    if(this.LeaveType==67){
      const date1: any = new Date(this.SDateOfLeave);
      const date2: any = new Date(this.EDateOfLeave);
      const diffTime = Math.abs(date2 - date1);
      if (date1.getTime() == date2.getTime()) {
        var diffDays = 1;
      } else {
        var diffDays = this.calcBusinessDays(date1, date2)
      }
      var eb = {
        'Building': 56,
        'StaffName': sessionStorage.getItem('staffid'),
        'SDateOfLeave': this.SDateOfLeave,
        'EDateOfLeave': this.EDateOfLeave,
        'NoOfDays': diffDays,
        'LeaveReason': this.LeaveReason,
        'LeaveType': this.LeaveType,
        'HalfDayBit': this.HalfDayBit,
        'PaidBit': 1,
        'Supervisor': 10331,
        'CoveringStaff': this.CoveringStaff,
        'AMPMText': 'AMPMText',
        'MedicalUrl1': this.attachmentsurl[0],
        'Status': 'Manager Pending'
      }
      this.DigiofficeService.InsertStaffLeaves(eb).subscribe(

        data => {
          debugger
          if (data == 0) {
            Swal.fire('Already Leave Applied for this Date');
          }
          else {
            Swal.fire('Saved successfully.');
            this.getpassword();
            this.InsertNotification();
          }


        },
      )
    }
    else{
      const date1: any = new Date(this.SDateOfLeave);
      const date2: any = new Date(this.EDateOfLeave);
      const diffTime = Math.abs(date2 - date1);
      //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  
      if (date1.getTime() == date2.getTime()) {
        var diffDays = 1;
      } else {
        var diffDays = this.calcBusinessDays(date1, date2)
      }
  
      this.DigiofficeService.GetLeaveConfiguration().subscribe((data: any) => {
        debugger
        this.leaveconfig = data.filter((x: { leaveCategory: any; }) => x.leaveCategory == this.LeaveType);
  
        if (this.leaveconfig.length == 0) {
          Swal.fire('Please Set Configuration for this Leave Type');
  
        }
        else {
          let monthlyLimit: number = 1.25;
          var date = new Date();
          var currentmonthno = date.getMonth() + 1;
          // let yearlyLimit = this.leaveconfig[0].yearlyLimit;
          var totaleaveentiletment: number = currentmonthno * monthlyLimit;
          this.DigiofficeService.GetStaffLeaves(10331, 1, "01-01-2020", "01-01-2050").subscribe(data => {
            debugger
  
  
            let temp: any = data.filter(x => x.uuid == sessionStorage.getItem('staffid') && x.leaveTypeID == this.LeaveType && x.status == 'Manager Approved');
            let total: any = 0;
            temp.forEach((element: { noOfDays: any; }) => {
              total += Number(element.noOfDays);
            });
            let totalleavesilldate = total;
  
  
            // if (totalleavesilldate >= yearlyLimit) {
            //   Swal.fire('Yearly Quota Completd for this Leave Type');
            // }
            var totalvailbeltilltoday = totaleaveentiletment - totalleavesilldate;
            var totalvailbeltilltoday = totalvailbeltilltoday < 0 ? 0 : totalvailbeltilltoday
            //   var lopdays = diffDays - totalvailbeltilltoday;
  
           
            if(this.HalfDayBit==true){
              diffDays=diffDays-0.5
            }
            if (diffDays > totalvailbeltilltoday) {
              this.lopdays = diffDays - totalvailbeltilltoday
            }
            else {
              this.lopdays = 0;
            }
            Swal.fire(({
              title: '<strong><u>Details</u></strong>',
              html:
                '<p style="font-size: 24px;text-align: start;margin-left: 135px;"> Monthly Limit   : ' + 1.25 +
                '       <br>' +
                'Used Till Date: ' + totalleavesilldate +
                '       <br>' +
                'Avilable Till Date: ' + totalvailbeltilltoday +
                '       <br>' +
                'Applied Days: ' + diffDays +
                '       <br>' +
                'LOP Day: ' + this.lopdays +
                '       <br>' +
                '</p>'
              ,
              showCloseButton: true,
              showCancelButton: true,
              focusConfirm: true,
  
            })).then((result) => {
              debugger
              if (result.value == true) {
                var eb = {
                  'Building': 56,
                  'StaffName': sessionStorage.getItem('staffid'),
                  'SDateOfLeave': this.SDateOfLeave,
                  'EDateOfLeave': this.EDateOfLeave,
                  'NoOfDays': this.lopdays,
                  'LeaveReason': this.LeaveReason,
                  'LeaveType': this.LeaveType,
                  'HalfDayBit': this.HalfDayBit,
                  'PaidBit': 1,
                  'Supervisor': 10331,
                  'CoveringStaff': this.CoveringStaff,
                  'AMPMText': 'AMPMText',
                  'MedicalUrl1': this.attachmentsurl[0],
                  'Status': 'Manager Pending'
                }
                this.DigiofficeService.InsertStaffLeaves(eb).subscribe(
  
                  data => {
                    debugger
                    if (data == 0) {
                      Swal.fire('Already Leave Applied for this Date');
                    }
                    else {
                      Swal.fire('Saved successfully.');
                      this.getpassword();
                      this.InsertNotification();
                    }
  
  
                  },
                )
              }
  
            })
  
          })
        }
  
      })
  
  
  
    }
   


  }

  public InsertNotification() {
    debugger

    var entity = {
      'Date': new Date(),
      'Event': 'Leave Request',
      'FromUser': 'Admin',
      'ToUser': this.Touser,
      'Message': 'Your Leave Request has been Successfully Submitted',
      'Photo': 'Null',
      'Building': 'Dynamics 1',
      'UserID': sessionStorage.getItem('staffid'),
      'NotificationTypeID': 3,
      'VendorID': 0


    }
    this.DigiofficeService.InsertNotification(entity).subscribe(data => {
      if (data != 0) {
        Swal.fire("Saved Successfully");
        location.href = "#/leaves";

      }

    })
  }
  public Cancel() {
    debugger
    this.router.navigate(['/employee/leaves']);
  }

  public attachments21: any = [];

  public attachments: any = [];
  onRemove21(event: any) {
    debugger
    console.log(event);
    this.attachments21.splice(this.attachments.indexOf(event), 1);
  }

  onSelect21(event: any) {
    debugger
    console.log(event);
    this.attachments21.push(...event.addedFiles);
    // this.attachments.push(abcd[0]);

  }

  public attachmentsurl: any = [];


  

  getpassword() {
    this.DigiofficeService.GetMyDetails().subscribe(data => {
      let temp: any = data.filter(x => x.id == sessionStorage.getItem('staffid'));
      if (temp.length != 0) {
        this.supervisoremail = temp[0].supervisoremail;
        this.employeename = temp[0].name;
        this.sendemail();
      }

    })
  }
  
  public Attactments = [];
  public sendemail() {
    var entity1 = {
      'emailto': this.supervisoremail,
      'emailsubject': 'Leave Application',
      'emailbody': 'Hi , <br> ' + this.employeename + ' has submitted the leave request Please  login into DigiOffice To Approve Or Reject It.<br> Thanks <br> Team Digi-Office',
      'attachmenturl': this.Attactments,
      'cclist': this.supervisoremail,
      'bcclist': this.supervisoremail,
    }
    this.DigiofficeService.sendemail1(entity1).subscribe(res => {
      debugger;
      this.Attactments = [];

     
    })

  }
}
