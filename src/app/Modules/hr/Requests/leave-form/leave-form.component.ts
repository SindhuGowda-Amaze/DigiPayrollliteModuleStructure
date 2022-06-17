import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';

@Component({
  selector: 'app-leave-form',
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.css']
})
export class LeaveFormComponent implements OnInit {

  LeaveType: any;
  CoveringStaff: any;
  Staffleaveenitilment: any;
  staffid: any;
  Touser: any;
  roleid: any;
  constructor(public DigiofficeService: DigipayrollserviceService, public router: Router) { }

  ngOnInit(): void {
    this.LeaveType="";
    this.roleid = sessionStorage.getItem('roledid')
    this.staffid = sessionStorage.getItem('staffid');
    this.GetLeaveType();

    this.DigiofficeService.GetMyDetails().subscribe(data => {
      debugger
      this.Staffleaveenitilment = data.filter(x => x.id == sessionStorage.getItem('staffid'));
      this.Touser = this.Staffleaveenitilment[0].supervisor;
    });

  }
  LeaveTypeList: any;
  public GetLeaveType() {
    debugger
    this.DigiofficeService.GetLeaveType().subscribe(data => {
      debugger
      this.LeaveTypeList = data;
    })
  }

  SDateOfLeave: any;
  EDateOfLeave: any;
  LeaveReason: any;

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

  leaveconfig: any;
  lopdays: any;
  halfday:any;
  autoApproval: any;
  public InserStaffLeave() {
    debugger
    const date1: any = new Date(this.SDateOfLeave);
    const date2: any = new Date(this.EDateOfLeave);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    this.DigiofficeService.GetLeaveConfiguration().subscribe((data: any) => {
      debugger
      this.leaveconfig = data.filter((x: { leaveCategory: any; }) => x.leaveCategory == this.LeaveType);

      if (this.leaveconfig.length == 0) {
        Swal.fire('Please Set Configuration for this Leave Type');

      }
      else {
        this.autoApproval = this.leaveconfig[0].autoApproval;
        if (this.leaveconfig[0].monthlyCapping == true) {
          let monthlyLimit = this.leaveconfig[0].monthlyLimit;
          var date = new Date();
          var currentmonthno = date.getMonth() + 1;
          let yearlyLimit = this.leaveconfig[0].yearlyLimit;
          var totaleaveentiletment = currentmonthno * monthlyLimit;
          this.DigiofficeService.GetStaffLeaves(10331, 1, "01-01-2020", this.formatDate(new Date())).subscribe(data => {
            debugger
            let levavedata: any = data.filter(x => x.uuid == sessionStorage.getItem('staffid') && x.leaveTypeID == this.LeaveType);

            let noOfDays: any = 0;
            let lopdays: any = 0;
            levavedata.forEach((element: { noOfDays: any; lopdays: any; }) => {
              noOfDays += Number(element.noOfDays);
              lopdays += Number(element.lopdays);
            });

            let totalleavesilldate: any = noOfDays - lopdays;
            if (totalleavesilldate >= yearlyLimit) {
              Swal.fire('Yearly Quota Completd for this Leave Type');
            }
            var totalvailbeltilltoday = totaleaveentiletment - totalleavesilldate;
            var totalvailbeltilltoday = totalvailbeltilltoday < 0 ? 0 : totalvailbeltilltoday
            //   var lopdays = diffDays - totalvailbeltilltoday;
            if (diffDays > totalvailbeltilltoday) {
              this.lopdays = diffDays - totalvailbeltilltoday
            }
            else {
              this.lopdays = 0;
            }
            Swal.fire(({
              title: '<strong><u>Details</u></strong>',
              icon: 'info',
              html:
                '<p style="font-size: 24px;text-align: start;margin-left: 135px;"> Monthly Limit   : ' + monthlyLimit +
                '       <br>' +
                'Used Till Date: ' + totalleavesilldate +
                '       <br>' +
                'Available Till Date: ' + totalvailbeltilltoday +
                '       <br>' +
                'Applied Days: ' + diffDays +
                '       <br>' +
                'LWOP: ' + this.lopdays +
                '       <br>' +
                '</p>'
              ,
              showCloseButton: true,
              showCancelButton: true,
              focusConfirm: true,

            })).then((result) => {
              debugger
              if (result.value == true) {
                if (this.autoApproval == 'Auto Approval') {
                  if (this.SDateOfLeave == " " || this.EDateOfLeave == " " || this.LeaveReason == " " || this.LeaveType == " " || this.SDateOfLeave == undefined || this.EDateOfLeave == undefined || this.LeaveReason == undefined || this.LeaveType == undefined) {
                    Swal.fire('Please Fill All The Mandatory Fields')
                  }
                  else {
                    var eb = {
                      'Building': 56,
                      'StaffName': sessionStorage.getItem('staffid'),
                      'SDateOfLeave': this.SDateOfLeave,
                      'EDateOfLeave': this.EDateOfLeave,
                      'NoOfDays': this.lopdays,
                      'LeaveReason': this.LeaveReason,
                      'LeaveType': this.LeaveType,
                      'HalfDayBit': this.halfday == true ? 1 : 0,
                      'PaidBit': 1,
                      'Supervisor': 10331,
                     
                      'CoveringStaff': this.CoveringStaff,
                      'AMPMText': 'AMPMText',
                      'MedicalUrl1': this.attachmentsurl[0],
                      'Status': this.autoApproval == 'Auto Approval' ? 'Manager Approved HR Approved' : 'Manager Pending HR Pending'
                    }
                    this.DigiofficeService.InsertStaffLeaves(eb).subscribe(

                      data => {
                        debugger
                        if (data == 0) {
                          Swal.fire('Already Leave Applied for this Date');
                        }
                        else {
                          var entity = {
                            'ID': 1,
                            'Status1': 'Manager Approved HR Approved',
                            'StaffName': sessionStorage.getItem('staffid'),
                            'LeaveTypeID': this.LeaveType,
                            'NoOfDays': this.lopdays,

                          }
                          this.DigiofficeService.ApproveStaffLeavesNewForHR(entity).subscribe(data => {
                            if (data != 0) {
                              Swal.fire('Saved successfully.');
                              this.InsertNotification();

                            }

                          })

                        }


                      },
                    )
                  }


                } else if (this.autoApproval == 'Manager Approval') {
                  if (this.SDateOfLeave == " " || this.EDateOfLeave == " " || this.LeaveReason == " " || this.LeaveType == " " || this.SDateOfLeave == undefined || this.EDateOfLeave == undefined || this.LeaveReason == undefined || this.LeaveType == undefined) {
                    Swal.fire('Please Fill All The Mandatory Fields')
                  }
                  else {
                    var eb = {
                      'Building': 56,
                      'StaffName': sessionStorage.getItem('staffid'),
                      'SDateOfLeave': this.SDateOfLeave,
                      'EDateOfLeave': this.EDateOfLeave,
                      'NoOfDays': this.lopdays,
                      'LeaveReason': this.LeaveReason,
                      'LeaveType': this.LeaveType,
                      'HalfDayBit': this.halfday == true ? 1 : 0,
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
                          this.InsertNotification();
                        }


                      },
                    )
                  }

                }
                else if (this.autoApproval == 'HR Approval') {
                  if (this.SDateOfLeave == " " || this.EDateOfLeave == " " || this.LeaveReason == " " || this.LeaveType == " " || this.SDateOfLeave == undefined || this.EDateOfLeave == undefined || this.LeaveReason == undefined || this.LeaveType == undefined) {
                    Swal.fire('Please Fill All The Mandatory Fields')
                  }
                  else {
                    var eb = {
                      'Building': 56,
                      'StaffName': sessionStorage.getItem('staffid'),
                      'SDateOfLeave': this.SDateOfLeave,
                      'EDateOfLeave': this.EDateOfLeave,
                      'NoOfDays': this.lopdays,
                      'LeaveReason': this.LeaveReason,
                      'LeaveType': this.LeaveType,
                    'HalfDayBit': this.halfday == true ? 1 : 0,
                      'PaidBit': 1,
                      'Supervisor': 10331,
                      'CoveringStaff': this.CoveringStaff,
                      'AMPMText': 'AMPMText',
                      'MedicalUrl1': this.attachmentsurl[0],
                      'Status': this.autoApproval == 'HR Approval' ? 'HR Pending' : 'Manager Pending HR Pending'
                    }
                    this.DigiofficeService.InsertStaffLeaves(eb).subscribe(

                      data => {
                        debugger
                        if (data == 0) {
                          Swal.fire('Already Leave Applied for this Date');
                        }
                        else {
                          Swal.fire('Saved successfully.');
                          this.InsertNotification();
                        }


                      },
                    )
                  }

                }
                else if (this.autoApproval == 'Level Approval') {
                  if (this.SDateOfLeave == " " || this.EDateOfLeave == " " || this.LeaveReason == " " || this.LeaveType == " " || this.SDateOfLeave == undefined || this.EDateOfLeave == undefined || this.LeaveReason == undefined || this.LeaveType == undefined) {
                    Swal.fire('Please Fill All The Mandatory Fields')
                  }
                  else {
                    var eb = {
                      'Building': 56,
                      'StaffName': sessionStorage.getItem('staffid'),
                      'SDateOfLeave': this.SDateOfLeave,
                      'EDateOfLeave': this.EDateOfLeave,
                      'NoOfDays': this.lopdays,
                      'LeaveReason': this.LeaveReason,
                      'LeaveType': this.LeaveType,
                    'HalfDayBit': this.halfday == true ? 1 : 0,
                      'PaidBit': 1,
                      'Supervisor': 10331,
                      'CoveringStaff': this.CoveringStaff,
                      'AMPMText': 'AMPMText',
                      'MedicalUrl1': this.attachmentsurl[0],
                      'Status': 'Manager Pending HR Pending'
                    }
                    this.DigiofficeService.InsertStaffLeaves(eb).subscribe(

                      data => {
                        debugger
                        if (data == 0) {
                          Swal.fire('Already Leave Applied for this Date');
                        }
                        else {
                          Swal.fire('Saved successfully.');
                          this.InsertNotification();
                        }


                      },
                    )
                  }

                }
              }

            })

          })
        }
        else {
          let monthlyLimit = this.leaveconfig[0].monthlyLimit;
          var date = new Date();
          var currentmonthno = date.getMonth() + 1;
          let yearlyLimit = this.leaveconfig[0].yearlyLimit;
          var totaleaveentiletment: number = yearlyLimit;
          this.DigiofficeService.GetStaffLeaves(10331, 1, "01-01-2020", this.formatDate(new Date())).subscribe(data => {
            debugger
            let totalleavesilldate = data.filter(x => x.uuid == sessionStorage.getItem('staffid') && x.leaveTypeID == this.LeaveType).length;
            if (totalleavesilldate >= yearlyLimit) {
              Swal.fire('Yearly Quota Completd for this Leave Type');
            }
            var totalvailbeltilltoday = totaleaveentiletment - totalleavesilldate;
            var totalvailbeltilltoday = totalvailbeltilltoday < 0 ? 0 : totalvailbeltilltoday
            //   var lopdays = diffDays - totalvailbeltilltoday;
            if (diffDays > totalvailbeltilltoday) {
              this.lopdays = diffDays - totalvailbeltilltoday
            }
            else {
              this.lopdays = 0;
            }
            Swal.fire(({
              title: '<strong><u>Details</u></strong>',
              icon: 'info',
              html:
                '<p style="font-size: 24px;text-align: start;margin-left: 135px;"> Monthly Limit   : ' + monthlyLimit +
                '       <br>' +
                'Used Till Date: ' + totalleavesilldate +
                '       <br>' +
                'Available Till Date: ' + totalvailbeltilltoday +
                '       <br>' +
                'Applied Days: ' + diffDays +
                '       <br>' +
                'LWOP: ' + this.lopdays +
                '       <br>' +
                '</p>'
              ,
              showCloseButton: true,
              showCancelButton: true,
              focusConfirm: true,

            })).then((result) => {
              debugger
              if (result.value == true) {
                if (this.autoApproval == 'Auto Approval') {
                  var eb = {
                    'Building': 56,
                    'StaffName': sessionStorage.getItem('staffid'),
                    'SDateOfLeave': this.SDateOfLeave,
                    'EDateOfLeave': this.EDateOfLeave,
                    'NoOfDays': this.lopdays,
                    'LeaveReason': this.LeaveReason,
                    'LeaveType': this.LeaveType,
                  'HalfDayBit': this.halfday == true ? 1 : 0,
                    'PaidBit': 1,
                    'Supervisor': 10331,
                    'CoveringStaff': this.CoveringStaff,
                    'AMPMText': 'AMPMText',
                    'MedicalUrl1': this.attachmentsurl[0],
                    'Status': this.autoApproval == 'Auto Approval' ? 'Manager Approved HR Approved' : 'Manager Pending HR Pending'
                  }
                  this.DigiofficeService.InsertStaffLeaves(eb).subscribe(

                    data => {
                      debugger
                      if (data == 0) {
                        Swal.fire('Already Leave Applied for this Date');
                      }
                      else {
                        var entity = {
                          'ID': 1,
                          'Status1': 'Manager Approved HR Approved',
                          'StaffName': sessionStorage.getItem('staffid'),
                          'LeaveTypeID': this.LeaveType,
                          'NoOfDays': this.lopdays,

                        }
                        this.DigiofficeService.ApproveStaffLeavesNewForHR(entity).subscribe(data => {
                          if (data != 0) {
                            Swal.fire('Saved successfully.');
                            this.InsertNotification();

                          }

                        })

                      }


                    },
                  )

                } else if (this.autoApproval == 'Manager Approval') {
                  var eb = {
                    'Building': 56,
                    'StaffName': sessionStorage.getItem('staffid'),
                    'SDateOfLeave': this.SDateOfLeave,
                    'EDateOfLeave': this.EDateOfLeave,
                    'NoOfDays': this.lopdays,
                    'LeaveReason': this.LeaveReason,
                    'LeaveType': this.LeaveType,
                  'HalfDayBit': this.halfday == true ? 1 : 0,
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
                        this.InsertNotification();
                      }


                    },
                  )
                }
                else if (this.autoApproval == 'HR Approval') {
                  var eb = {
                    'Building': 56,
                    'StaffName': sessionStorage.getItem('staffid'),
                    'SDateOfLeave': this.SDateOfLeave,
                    'EDateOfLeave': this.EDateOfLeave,
                    'NoOfDays': this.lopdays,
                    'LeaveReason': this.LeaveReason,
                    'LeaveType': this.LeaveType,
                  'HalfDayBit': this.halfday == true ? 1 : 0,
                    'PaidBit': 1,
                    'Supervisor': 10331,
                    'CoveringStaff': this.CoveringStaff,
                    'AMPMText': 'AMPMText',
                    'MedicalUrl1': this.attachmentsurl[0],
                    'Status': this.autoApproval == 'HR Approval' ? 'HR Pending' : 'Manager Pending HR Pending'
                  }
                  this.DigiofficeService.InsertStaffLeaves(eb).subscribe(

                    data => {
                      debugger
                      if (data == 0) {
                        Swal.fire('Already Leave Applied for this Date');
                      }
                      else {
                        Swal.fire('Saved successfully.');
                        this.InsertNotification();
                      }


                    },
                  )
                }
                else if (this.autoApproval == 'Level Approval') {
                  var eb = {
                    'Building': 56,
                    'StaffName': sessionStorage.getItem('staffid'),
                    'SDateOfLeave': this.SDateOfLeave,
                    'EDateOfLeave': this.EDateOfLeave,
                    'NoOfDays': this.lopdays,
                    'LeaveReason': this.LeaveReason,
                    'LeaveType': this.LeaveType,
                  'HalfDayBit': this.halfday == true ? 1 : 0,
                    'PaidBit': 1,
                    'Supervisor': 10331,
                    'CoveringStaff': this.CoveringStaff,
                    'AMPMText': 'AMPMText',
                    'MedicalUrl1': this.attachmentsurl[0],
                    'Status': 'Manager Pending HR Pending'
                  }
                  this.DigiofficeService.InsertStaffLeaves(eb).subscribe(

                    data => {
                      debugger
                      if (data == 0) {
                        Swal.fire('Already Leave Applied for this Date');
                      }
                      else {
                        Swal.fire('Saved successfully.');
                        this.InsertNotification();
                      }


                    },
                  )
                }
              }

            })

          })


        }

      }

    })





  }

  public InsertNotification() {
    debugger

    var entity = {
      'Date': new Date(),
      'Event': 'Leave Request',
      'FromUser': 'Admin',
      'ToUser': this.Touser,
      'Message': 'Your Leave Request has been Successfully',
      'Photo': 'Null',
      'Building': 'Dynamics 1',
      'UserID': sessionStorage.getItem('staffid'),
      'NotificationTypeID': 3,
      'VendorID': 0


    }
    this.DigiofficeService.InsertNotification(entity).subscribe(data => {
      if (data != 0) {
        Swal.fire("Saved Successfully");
        location.href = "#/LeaveListDashboard";

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


}