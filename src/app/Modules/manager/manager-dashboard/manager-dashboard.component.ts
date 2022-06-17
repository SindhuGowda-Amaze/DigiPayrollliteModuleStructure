import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent implements OnInit {
  punchintime: any;
  punchouttime: any;
  punchinId: any;
  ipaddress: any;
  punchoutid: any;
  topholidayname: any;
  topholidaydate: any
  holidaylist: any;
  holidaylist1: any
  tpholidayattachment: any;
  search: any;
  FirstDoseDate: any;
  EmployeeVaccinationDetail: any;
  certificate_url: any;
  SecondDoseDate: any;
  BoosterName: any;
  BoosterDoseDate: any;
  Anniversery: any
  Birthday: any;
  NewJoinee: any;
  Anniverserylist: any;
  Anniverserylist1: any;
  Anniverserylist2: any;
  term: any;
  staffleaves1: any;
  pendingcount: any;
  Rejectedcount: any;
  approvedcount: any;
  pendingcount1: any;
  Rejectedcount1: any;
  approvedcount1: any;
  showback: any;
  showfront: any;
  myDate: any;
  CancelledCount: any;
  staffID: any;
  Rejectedotcount: any;
  profilepercentage: any
  myleaves: any;
  public number: number = 1000;
  UserID: any;
  SigninDate: any;
  SigninLocation: any;
  StatusID: any;

  username: any;
  email: any;
  month: any;
  day: any;
  stafflistapproved: any;
  stafflist: any;
  stafflistnewrequest: any;
  approvedloancount: any;
  newrquestloancount: any;
  stafflistrejected: any;
  rejectedloancount: any;
  newexpensecount: any;
  approvedexpensecount: any;
  timedetails: any;
  cancelledexpensecount: any;
  pendingotcount: any;
  approvedotcount: any;
  roleid: any;
  loader: any;
  ipAddress: any;
  pendingteamexpensecount: any;
  Rejectedteamexpnesecount: any;
  approvedteamexpnescount: any;
  pendingreg: any;
  approevedreg: any;
  currentUrl: any;

  constructor(public router: Router, private datePipe: DatePipe, public DigiofficeService: DigipayrollserviceService, private http: HttpClient) { }

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.loader = true
    this.getDetails();
    this.GetHolidays();
    var dateObj = new Date();
    this.month = dateObj.getUTCMonth() + 1; //months from 1-12
    this.day = dateObj.getUTCDate();
    this.myDate = new Date();
    this.showfront = true;
    this.Anniversery = true;
    this.Birthday = false;
    this.NewJoinee = false;
    this.roleid = sessionStorage.getItem('roledid');
    var date = new Date();

    this.DigiofficeService.GetEmployeeLoans().subscribe(data => {
      debugger
      this.stafflist = data;
      if (this.roleid == 2) {
        this.stafflistnewrequest = this.stafflist.filter((x: { status: string, supervisor: string }) => x.status == 'Manager Pending,HR Pending,Payroll Pending,Finance Pending' && x.supervisor == sessionStorage.getItem('staffid'))
        this.newrquestloancount = this.stafflistnewrequest.length;
        this.stafflistapproved = this.stafflist.filter((x: { status: string, supervisor: string }) => x.status != 'Manager Pending,HR Pending,Payroll Pending,Finance Pending' && x.status != 'Manager Rejected,HR Pending,Payroll Pending,Finance Pending' && x.supervisor == sessionStorage.getItem('staffid'))
        // this.stafflistapproved=this.stafflist.filter((x:{supervisor: string,status: string})=> x.supervisor==sessionStorage.getItem('staffid') || x.status!='Manager Pending,HR Pending,Payroll Pending,Finance Pending'  )
        this.approvedloancount = this.stafflistapproved.length;
        this.stafflistrejected = this.stafflist.filter((x: { status: string, supervisor: string }) => x.status == 'Manager Rejected,HR Pending,Payroll Pending,Finance Pending' && x.supervisor == sessionStorage.getItem('staffid'))
        this.rejectedloancount = this.stafflistrejected.length
      }
      else {
        this.stafflistnewrequest = this.stafflist.filter((x: { status: string }) => x.status == 'Manager Approved,HR Pending,Payroll Pending,Finance Pending')
        this.newrquestloancount = this.stafflistnewrequest.length;
        this.stafflistapproved = this.stafflist.filter((x: { status: string }) => x.status != 'Manager Approved,HR Pending,Payroll Pending,Finance Pending' && x.status != 'Manager Approved,HR Rejected,Payroll Pending,Finance Pending')
        // this.stafflistapproved=this.stafflist.filter((x:{supervisor: string,status: string})=> x.supervisor==sessionStorage.getItem('staffid') || x.status!='Manager Pending,HR Pending,Payroll Pending,Finance Pending'  )
        this.approvedloancount = this.stafflistapproved.length;
        this.stafflistrejected = this.stafflist.filter((x: { status: string }) => x.status == 'Manager Approved,HR Rejected,Payroll Pending,Finance Pending')
        this.rejectedloancount = this.stafflistrejected.length
      }




    });

    this.DigiofficeService.GetExpensesListweb().subscribe(data => {
      debugger
      this.projectlist = data.filter(x => x.supervisor == this.staffID)
      this.newexpensecount = this.projectlist.filter((x: { approvalStatus: string; }) => x.approvalStatus = 'Manager Pending Finance Pending').length
      this.approvedexpensecount = this.projectlist.filter((x: { approvalStatus: string; }) => x.approvalStatus == 'Manager Approved Finance Approved' || x.approvalStatus == 'Manager Approved Finance Pending').length
      this.cancelledexpensecount = this.projectlist.filter((x: { approvalStatus: string; }) => x.approvalStatus == 'Manager Rejected Finance Pending' || x.approvalStatus == 'Manager Approved Finance Rejected').length
    })

    this.DigiofficeService.GetStaffOverTimeDetails().subscribe(data => {
      debugger
      this.timedetails = data.filter(x => x.supervisor == this.staffID);
      this.pendingotcount = this.timedetails.filter((x: { status: string; }) => x.status == 'Manager Pending').length
      this.approvedotcount = this.timedetails.filter((x: { status: string; }) => x.status == 'Manager Approved').length
      this.Rejectedotcount = this.timedetails.filter((x: { status: string; }) => x.status == 'Manager Rejected').length
    },
    )


    this.staffID = sessionStorage.getItem('staffid');
    this.username = sessionStorage.getItem('UserName');
    this.email = sessionStorage.getItem('email');
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.DigiofficeService.GetMyDetails().subscribe(data => {
      debugger
      let temp: any = data.filter(x => x.id == this.staffID);
      this.profilepercentage = temp[0].profilepercentage * 9

    })
    this.getipaddress();
    this.DigiofficeService.GetAttendance().subscribe(data => {
      debugger
      let temp: any = data.filter(x => x.userID == sessionStorage.getItem('staffid') && x.filterdate == this.formatDate(date));
      this.punchintime = temp[0].signinDate;

    })

    this.DigiofficeService.GetAttendance().subscribe(data => {
      debugger
      let temp: any = data.filter(x => x.userID == sessionStorage.getItem('staffid') && x.filterdate == this.formatDate(date));
      this.punchouttime = temp[0].signoutDate;

    })
    //this.GetHolidays();
    this.GetAnnouncements();
    this.changeAnniversary();
    this.getstaffleaves1();
    this.GetAttendance();
    this.GetExpensesListweb();
    this.DigiofficeService.GetCancelledStaffLeaves(10331, 1, "01-01-2020", "01-01-2025").subscribe(data => {
      debugger
      this.myleaves = data.filter(x => x.uuid == sessionStorage.getItem('staffid'));
      this.pendingcount1 = this.myleaves.filter((x: { status: string; }) => x.status == 'Manager Pending HR Pending' || x.status == 'Manager Approved HR Pending').length;
      this.Rejectedcount1 = this.myleaves.filter((x: { status: string; }) => x.status == 'Rejected').length;
      this.CancelledCount = this.myleaves.filter((x: { status: string; }) => x.status == 'Cancelled').length;
      this.approvedcount1 = this.myleaves.filter((x: { status: string; }) => x.status == 'Manager Approved HR Approved').length;
    });

    this.DigiofficeService.GetExpensesListweb().subscribe(data => {
      debugger
      let teamexpnes: any = data.filter(x => x.supervisor == sessionStorage.getItem('staffid'));
      this.pendingteamexpensecount = teamexpnes.filter((x: { status: string; }) => x.status == 'Manager Pending Finance Pending' || x.status == null).length;
      this.Rejectedteamexpnesecount = teamexpnes.filter((x: { status: string; }) => x.status == 'Rejected' || x.status == 'Manager Rejected' || x.status == 'Manager Approved Finance Rejected').length;
      this.approvedteamexpnescount = teamexpnes.filter((x: { status: string; }) => x.status == 'Manager Approved Finance Approved' || x.status == 'Manager Approved Finance Pending').length;

    })

    this.DigiofficeService.GetAttendance().subscribe(data => {
      debugger
      let teamregularization: any = data.filter(x => x.supervisor == this.staffID);
      this.pendingreg = teamregularization.filter((x: { approve: number; }) => x.approve != 1).length;
      this.approevedreg = teamregularization.filter((x: { approve: number; }) => x.approve == 1).length;
    })
    this.loader = false
  }

  public getipaddress() {
    debugger
    this.DigiofficeService.getIPAddress()
      .subscribe({
        next: data => {
          debugger
          let temap: any = data
          this.ipaddress = temap.ip
        }, error: (err) => {
          Swal.fire('Issue in Getting IPAddress');
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

  public getstaffleaves1() {
    debugger
    if (this.roleid == 2) {
      this.DigiofficeService.GetCancelledStaffLeaves(10331, 1, "01-01-2020", "01-01-2025")


        .subscribe({
          next: data => {
            debugger
            this.staffleaves1 = data.filter((x: { supervisor: string | null; status: string | null; }) => x.supervisor == sessionStorage.getItem('staffid') && x.status == 'Manager Pending HR Pending');
            let temp: any = data.filter((x: { supervisor: string }) => x.supervisor == sessionStorage.getItem('staffid'));
            this.pendingcount = temp.filter((x: { status: string; }) => x.status == 'Manager Pending HR Pending' || x.status == 'Manager Pending').length;
            this.Rejectedcount = temp.filter((x: { status: string; }) => x.status == 'Rejected' || x.status == 'Manager Rejected HR Pending').length;
            this.approvedcount = (data.filter((x: { supervisor: string, status: string; }) => x.supervisor == sessionStorage.getItem('staffid') && x.status == 'Manager Approved HR Approved' || x.status == 'Manager Approved' || x.status == 'Manager Approved HR Pending').length) - 2;;
            this.CancelledCount = temp.filter((x: { status: string; }) => x.status == 'Cancelled').length;
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
    else {
      this.DigiofficeService.GetCancelledStaffLeaves(10331, 1, "01-01-2020", "01-01-2025")
        .subscribe({
          next: data => {
            debugger
            this.staffleaves1 = data.filter((x: { supervisor: string | null; status: string | null; }) => x.status == 'Manager Approved HR Pending');
            let temp: any = data;
            this.pendingcount = temp.filter((x: { status: string; }) => x.status == 'Manager Approved HR Pending' || x.status == 'HR Pending').length;
            this.Rejectedcount = temp.filter((x: { status: string; }) => x.status == 'Rejected' || x.status == 'Manager Approved HR Rejected').length;
            this.approvedcount = temp.filter((x: { status: string; }) => x.status == 'Manager Approved HR Approved' || x.status == 'Manager Approved HR Rejected').length;
            this.CancelledCount = temp.filter((x: { status: string; }) => x.status == 'Cancelled').length;
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
  }

  projectlist: any
  public GetExpensesListweb() {
    debugger
    this.DigiofficeService.GetExpensesListweb()

      .subscribe({
        next: data => {
          debugger
          this.projectlist = data.filter(x => x.supervisor == this.staffID && (x.status == 'Manager Pending Finance Pending' || x.status == null));
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

  public holidays() {
    this.router.navigate(['/HolidayDashboard'])

  }


  public changebirthday() {
    debugger;
    localStorage.setItem('birthday', String(this.day).concat('-', String(this.month)))
    this.Anniversery = false;
    this.Birthday = true;
    this.NewJoinee = false;
    this.DigiofficeService.GetMyDetails()

      .subscribe({
        next: data => {
          debugger
          this.Anniverserylist1 = data.filter(x => x.dobdate == String(this.day).concat('-', String(this.month)));
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



  public changenewjoinee() {
    debugger;
    this.Anniversery = false;
    this.Birthday = false;
    this.NewJoinee = true;
    this.DigiofficeService.GetMyDetails()

      .subscribe({
        next: data => {
          debugger
          this.Anniverserylist2 = data.filter(x => x.joiningDate == this.myDate + "T00:00:00");
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

  public Profilecompletion() {
    this.router.navigate(['/hr/ProfileCompletionForm', this.staffID])

  }




  public flip(event: { currentTarget: any; }) {
    debugger
    var element = event.currentTarget;
    if (element.className === "card") {
      if (element.style.transform == "rotateY(180deg)") {
        element.style.transform = "rotateY(0deg)";
      }
      else {
        element.style.transform = "rotateY(180deg)";
      }
    }
  };


  public flip1(event: { currentTarget: any; }) {
    debugger
    var element = event.currentTarget;
    if (element.className === "card1") {
      if (element.style.transform == "rotateY(180deg)") {
        element.style.transform = "rotateY(0deg)";
      }
      else {
        element.style.transform = "rotateY(180deg)";
      }
    }
  };

  public leavedashbaord1() {
    debugger
    this.router.navigate(['/MyTeamLeaveDetails']);
  }

  public leavedashbaord() {
    debugger
    this.router.navigate(['/LeaveListDashboard']);
  }
  public Regularization() {
    debugger
    this.router.navigate(['/MyTeamAttendenceRegularisation']);
  }
  public Regularization1() {
    debugger
    this.router.navigate(['/AttendanceView']);
  }

  public goprofile() {
    debugger
    this.router.navigate(['/EmployeeProfileView']);
  }

  count: any;
  attendancelist: any;
  public GetAttendance() {
    debugger
    this.DigiofficeService.GetAttendance()


      .subscribe({
        next: data => {
          debugger
          this.attendancelist = data.filter(x => x.supervisor == this.staffID)
          this.count = this.attendancelist.length
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



  staffleaves: any;
  public getstaffleaves() {
    debugger
    this.DigiofficeService.GetStaffLeaves(10331, 1, "01-01-2020", "01-01-2025")

      .subscribe({
        next: data => {
          debugger
          this.staffleaves = data.filter(x => x.id == this.staffID);
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


  annnounecemnetlist: any;
  public GetAnnouncements() {
    debugger
    this.DigiofficeService.GetAnnouncementsByBuildingID(56)



      .subscribe({
        next: data => {
          debugger
          this.annnounecemnetlist = data;
        }, error: (err) => {
          Swal.fire('Issue in Getting AnnouncementsByBuildingID');
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





  public getDetails() {
    debugger

    this.DigiofficeService.GetEmployeeVaccinationDetails()

      .subscribe({
        next: data => {
          debugger
          this.EmployeeVaccinationDetail = data.filter(x => x.employeeId == this.staffID);
          this.FirstDoseDate = this.EmployeeVaccinationDetail[0].firstDoseDate,
            this.certificate_url = this.EmployeeVaccinationDetail[0].certificate_url,
            this.SecondDoseDate = this.EmployeeVaccinationDetail[0].secondDoseDate,
            this.BoosterName = this.EmployeeVaccinationDetail[0].boosterName,
            this.BoosterDoseDate = this.EmployeeVaccinationDetail[0].boosterDoseDate
        }, error: (err) => {
          Swal.fire('Issue in Getting EmployeeVaccinationDetails');
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

  public GetHolidays() {
    debugger
    this.DigiofficeService.GetHolidays()


      .subscribe({
        next: data => {
          debugger
          this.holidaylist = data;
          this.holidaylist1 = data;
          this.topholidayname = this.holidaylist[0].holiday;
          this.topholidaydate = this.holidaylist[0].holidayDate;
          this.tpholidayattachment = this.holidaylist[0].attachment;
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



  public punchin() {
    debugger
    if (this.punchintime != undefined) {
      Swal.fire('Already Punched In for the day');
    }
    else {
      var options = { hour12: false };
      var date = new Date();

      // this.punchintime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      var entity = {
        UserID: sessionStorage.getItem('staffid'),
        SigninDate: date.toLocaleString('en-US', options),
        SigninLocation: 'Office',
        StatusID: 1,
        punchinip: this.ipaddress,
        ApprovalStatus: 'Manager Pending HR Pending'

      }
      this.DigiofficeService.InsertAttendanceWeb(entity)
        .subscribe({
          next: data => {
            debugger
            if (data != 0) {
              this.punchinId = data
              sessionStorage.setItem('PunchINid', this.punchinId)
              Swal.fire('Punched In Successfully')
              this.DigiofficeService.GetAttendance().subscribe(data => {
                debugger
                let temp: any = data.filter(x => x.userID == sessionStorage.getItem('staffid') && x.filterdate == this.formatDate(date));
                this.punchintime = temp[0].signinDate;
              })
            }
          }, error: (err) => {
            Swal.fire('Issue in Getting AttendanceWeb');
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


  public punchout() {
    if (this.punchouttime != undefined) {
      Swal.fire('Already Punched Out for the day');
    }
    else {
      var options = { hour12: false };
      var date = new Date();
      this.DigiofficeService.GetAttendance()
        .subscribe({
          next: data => {
            var todayDate = new Date().toISOString().slice(0, 10);
            let temp: any = data.filter(x => x.filterdate == todayDate);
            this.punchoutid = temp[0].id;
            var entity = {
              ID: this.punchoutid,
              SignoutDate: date.toLocaleString('en-US', options),
              SignoutLocation: 'Office',
              StatusID: 2,
              punchoutip: this.ipaddress

            }
            this.DigiofficeService.UpdateAttendanceWeb(entity)
              .subscribe({
                next: data => {
                  if (data != 0) {
                    Swal.fire('Punched Out Successfully');
                    sessionStorage.removeItem('PunchINid');
                    this.DigiofficeService.GetAttendance().subscribe(data => {
                      debugger
                      let temp: any = data.filter(x => x.userID == sessionStorage.getItem('staffid') && x.filterdate == this.formatDate(date));
                      this.punchouttime = temp[0].signoutDate;

                    })
                  }



                }, error: (err) => {
                  Swal.fire('Issue in Getting AttendanceWeb');
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


  public changeAnniversary() {
    debugger;
    this.Anniversery = true;
    this.Birthday = false;
    this.NewJoinee = false;
    this.DigiofficeService.GetMyDetails()
 
    .subscribe({
      next: data => {
        debugger
        this.Anniverserylist = data.filter(x => x.anniversarydate == String(this.day).concat('-', String(this.month)));
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

  public getwishdate() {
    this.DigiofficeService.GetMyDetails()
    .subscribe({
      next: data => {
        debugger
        this.Anniverserylist = data.filter(x => x.date_Of_Marriage == this.myDate + "T00:00:00");
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
