import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-team-overtimedetails',
  templateUrl: './my-team-overtimedetails.component.html',
  styleUrls: ['./my-team-overtimedetails.component.css']
})
export class MyTeamOvertimedetailsComponent implements OnInit {

  viewMode = 'tab1';
  selecallbtn: any;
  projectlist: any;
  attendancelist: any;
  RoleTypeList: any;
  Departmentlist: any;
  roleid: any;
  date: any;
  RoleType: any;
  Department: any;
  count: any;
  p: any = 1;
  count1: any = 10;
  TransportationType: any;
  Date: any;
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};
  StaffID: any;
  OTlist: any;
  Supervisor: any;
  Name: any;
  Project: any;
  Destination: any;
  Purpose: any;
  ContactPerson: any;
  ContactPhNo: any;
  TimeOfDeparture: any;
  TimeOfReturn: any;

  noofhours: any;
  Comments: any;
  type: any;
  day: any
  attendancelistcopy: any;
  timedetails: any;
  currentUrl: any;
  constructor(public DigiofficeService: DigipayrollserviceService, public router: Router) { }

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.Department = "";
    this.RoleType = "";
    this.roleid = sessionStorage.getItem('roledid');
    this.getovertime();
    this.GetMyOverTimeDetails();

    this.DigiofficeService.GetDepartment().subscribe(data => {
      debugger
      this.Departmentlist = data;
    });

    this.DigiofficeService.GetRoleType().subscribe(data => {
      debugger
      this.RoleTypeList = data;
    });

    this.StaffID = sessionStorage.getItem('staffid');
    this.DigiofficeService.GetOTRates().subscribe(data => {
      debugger
      this.OTlist = data
    })
  }

  public GetMyOverTimeDetails() {
    debugger
    this.DigiofficeService.GetStaffOverTimeDetails()

      .subscribe({
        next: data => {
          debugger
          this.timedetails = data.filter(x => x.supervisor == sessionStorage.getItem('staffid'));
          this.count = this.timedetails.length
        }, error: (err) => {
          Swal.fire('Issue in Getting StaffOverTimeDetails');
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

  public getovertime() {
    debugger
    // this.DigiofficeService.GetStaffOverTimeDetails().subscribe(data => {
    //   debugger
    //   this.projectlist = data.filter(x => x.supervisor == sessionStorage.getItem('staffid'))
    // })
    this.DigiofficeService.GetAttendance()

      .subscribe({
        next: data => {
          debugger
          if (this.roleid == 9) {
            this.attendancelist = data
          }
          else {
            this.attendancelist = data.filter(x => x.supervisor == sessionStorage.getItem('staffid') && x.ot > 0 && (x.approvalStatus == null || x.approvalStatus == 'Manager Pending HR Pending' || x.approvalStatus == 'Manager Pending' || x.approvalStatus == 'Manager Approved HR Pending' || x.approvalStatus == 'Manager Approved' || x.approvalStatus == 'Manager Rejected'))
            this.attendancelistcopy = this.attendancelist
          }
        }, error: (err) => {
          Swal.fire('Issue in Getting Attendance');
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

  public FilterAttendence() {
    debugger
    let searchCopy = this.term.toLowerCase();
    this.attendancelist = this.attendancelistcopy.filter((x: { name: string }) =>
      x.name.toLowerCase().includes(searchCopy));
    this.count = this.attendancelist.length;
  }

  public getRoleType(event: any) {
    debugger
    this.RoleType = event.target.value;
  }


  public ManagerLeaveApprove(id: any) {
    debugger

    var entity = {
      'ID': id.id,
      'ApprovalStatus': 'Manager Approved',
      'UserID': id.userID


    }
    this.DigiofficeService.ApproveOtRequest(entity)


      .subscribe({
        next: data => {
          debugger
          Swal.fire("Approved Successfully");
          this.ngOnInit();
        }, error: (err) => {
          Swal.fire('Issue in Getting ApproveOtRequest');
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

  public ManagerReject(id: any) {
    debugger

    var entity = {
      'ID': id.id,
      'ApprovalStatus': 'Manager Rejected',
      'UserID': id.userID


    }
    this.DigiofficeService.ApproveOtRequest(entity)

      .subscribe({
        next: data => {
          debugger
          Swal.fire("Rejected Successfully");
          this.ngOnInit();
        }, error: (err) => {
          Swal.fire('Issue in Getting ApproveOtRequest');
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

  public ManagerLeaveReject(id: any) {
    debugger

    var entity = {
      'ID': id.id,
      'ApprovalStatus': 'Manager Rejected',
      'UserID': id.userID


    }
    this.DigiofficeService.ApproveOtRequest(entity)



      .subscribe({
        next: data => {
          debugger
          Swal.fire("Rejected Successfully");
          this.ngOnInit();
        }, error: (err) => {
          Swal.fire('Issue in Getting ApproveOtRequest');
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


  public FilterRoleType() {
    debugger
    this.DigiofficeService.GetMyDetails()

      .subscribe({
        next: data => {
          debugger
          this.attendancelist = data.filter(x => x.roleType == this.RoleType || (x.supervisor == sessionStorage.getItem('staffid') && x.ot > 0));
          this.count = this.attendancelist.length;
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

  public filterByDepartment() {
    debugger
    this.DigiofficeService.GetMyDetails()

      .subscribe({
        next: data => {
          debugger
          this.attendancelist = data.filter(x => x.department == this.Department || (x.supervisor == sessionStorage.getItem('staffid') && x.ot > 0));
          this.count = this.attendancelist.length;
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


  edate: any;
  public getdate() {
    debugger
    this.DigiofficeService.GetAttendance()

      .subscribe({
        next: data => {
          debugger
          this.attendancelist = data.filter(x => x.supervisor == sessionStorage.getItem('staffid') && (x.filterdate >= this.date && x.filterdate1 <= this.edate))
        }, error: (err) => {
          Swal.fire('Issue in Getting Attendance');
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

  temp: any;
  public IntID: any = [];
  public ID: any = [];
  term: any
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
      this.ID.push(evn.id);
    }
  }

  selectALL(checked: boolean) { // pass true or false to check or uncheck all
    this.selecallbtn = true;
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].type == "checkbox") {
        inputs[i].checked = checked;
        // This way it won't flip flop them and will set them all to the same value which is passed into the function
      }
    }
  }
  public Approveall() {
    debugger
    this.selecallbtn = false;
    Swal.fire('Approved Successfully');
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].type == "checkbox") {
        inputs[i].checked = false;
        // This way it won't flip flop them and will set them all to the same value which is passed into the function
      }
    }
  }

  public Save() {
    debugger

    var eb = {
      'StaffID': sessionStorage.getItem('staffid'),
      'Date': this.Date,
      'noofhours': this.noofhours,
      'Comments': this.Comments,
      'type': this.type,
      'daytype': this.day

    }
    this.DigiofficeService.InsertStaffOverTimeDetails(eb)

      .subscribe({
        next: data => {
          debugger
          Swal.fire('Saved successfully.');
          this.router.navigate(['/MyOverTimeDetails']);
        }, error: (err) => {
          Swal.fire('Issue in Getting StaffOverTimeDetails');
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

  id: any;

  sdte: any;
  Notes: any;
  public GetRejectID(list: any) {
    this.id = list.id;
    this.sdte = list.sdte;
    this.edate = list.edate;
  }

  public ManagerOTApprove(id: any) {
    debugger

    var entity = {
      'ID': id.id,
      'Status': 'Manager Approved',


    }
    this.DigiofficeService.UpdateOtFromManager(entity)

      .subscribe({
        next: data => {
          debugger
          Swal.fire("Approved Successfully");
          this.ngOnInit();
        }, error: (err) => {
          Swal.fire('Issue in Getting OtFromManager');
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
  id1: any;
  public getid(id: any) {
    this.id1 = id
  }
  RejectReason: any;

  public ManagerOTReject() {
    debugger

    var entity = {
      'ID': this.id1,
      'Status': 'Manager Rejected',
      'RejectReason': this.RejectReason


    }
    this.DigiofficeService.UpdateOtFromManager(entity)

      .subscribe({
        next: data => {
          debugger
          Swal.fire("Rejected Successfully");
          this.ngOnInit();
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
}
