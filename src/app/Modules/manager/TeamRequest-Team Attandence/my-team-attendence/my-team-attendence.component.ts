import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';

@Component({
  selector: 'app-my-team-attendence',
  templateUrl: './my-team-attendence.component.html',
  styleUrls: ['./my-team-attendence.component.css']
})
export class MyTeamAttendenceComponent implements OnInit {
  currentUrl: any;
  roleid: any
  staffID: any;
  p: any = 1;
  count1: any = 5;
  count: any;
  loader: any;
  attendancelistcopy: any;
  RoleType: any;
  Department: any;
  month: any;
  Departmentlist: any;
  RoleTypeList: any;
  employeeid: any
  startdate: any;
  enddate: any;
  attendancelist: any;
  startingTime1: any;
  endTime1: any;
  selecallbtn: any;
  Search: any;
  attendancelistCopy: any;

  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};
  constructor(public DigiofficeService: DigipayrollserviceService) { }
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.loader = true;
    this.month = new Date().getMonth();
    this.roleid = sessionStorage.getItem('roledid');
    this.staffID = sessionStorage.getItem('staffid');

    this.RoleType = "";
    this.Department = "";

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
    this.DigiofficeService.GetRoleType()
      .subscribe({
        next: data => {
          debugger
          this.RoleTypeList = data;
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
    this.GetAttendance();
    this.DigiofficeService.GetMyDetails()
      .subscribe({
        next: data => {
          debugger
          this.dropdownList = data;
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
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,
    };
  }
  onItemSelect(item: any) {
    debugger
    console.log(item);
    this.employeeid = item.id;
    this.DigiofficeService.GetAttendance()
      .subscribe({
        next: data => {
          debugger
          this.attendancelist = data.filter(x => x.userID == this.employeeid && (x.filterdate >= this.startdate && x.filterdate <= this.enddate))
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
  public Filterjobs() {
    debugger
    let searchCopy = this.selectedItems.toLowerCase();
    this.attendancelist = this.attendancelistCopy.filter((x: { userID: string }) => x.userID.toString().includes(searchCopy));
  }
  public getenddate(event: any) {
    debugger
    if (this.roleid == 2) {
      this.DigiofficeService.GetAttendance()
        .subscribe({
          next: data => {
            debugger
            this.attendancelist = data.filter(x => x.supervisor == sessionStorage.getItem('staffid') && (x.filterdate >= this.startdate && x.filterdate <= this.enddate))
          }, error: (err) => {
            Swal.fire('Issue in GettingAttendance');
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
      this.DigiofficeService.GetAttendance()
        .subscribe({
          next: data => {
            debugger
            this.attendancelist = data.filter(x => (x.filterdate >= this.startdate && x.filterdate <= this.enddate))
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
  }
  public getRoleType(event: any) {
    debugger
    this.RoleType = event.target.value;
  }
  public FilterRoleType() {
    debugger
    this.DigiofficeService.GetAttendance()
      .subscribe({
        next: data => {
          debugger
          this.attendancelist = data.filter(x => x.role == this.RoleType && x.supervisor == sessionStorage.getItem('staffid') && x.month == (this.month + 1));
          this.count = this.attendancelist.length;
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
  public filterByDepartment() {
    debugger
    this.DigiofficeService.GetMyDetails()
      .subscribe({
        next: data => {
          debugger
          this.attendancelist = data.filter(x => x.department == this.Department);
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
  public GetAttendance() {
    debugger
    if (this.roleid == '2') {
      this.DigiofficeService.GetAttendance()
        .subscribe({
          next: data => {
            debugger
            this.attendancelist = data.filter(x => x.supervisor == sessionStorage.getItem('staffid') && x.month == (this.month + 1))
            this.count = this.attendancelist.length;
            this.loader = false;
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
    else {
      this.DigiofficeService.GetAttendance()
        .subscribe({
          next: data => {
            debugger
            this.attendancelist = data.filter(x => x.month == (this.month + 1))
            this.count = this.attendancelist.length;
            this.attendancelistcopy = this.attendancelist
            this.loader = false;
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

  public GetAttendanceConfiguration(){
    
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



}