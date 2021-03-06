import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-team-loans',
  templateUrl: './team-loans.component.html',
  styleUrls: ['./team-loans.component.css']
})

export class TeamLoansComponent implements OnInit {

  constructor(public DigiofficeService: DigipayrollserviceService, public router: Router) { }
  password1: any;
  supervisoremail: any;
  employeename: any;
  employeeemail: any;
  LoanType: any;
  date: any;
  Comments: any;
  stafflist: any;
  roledid: any;
  term: any;
  stafflistCopy: any;
  p: any = 1;
  count1: any = 10;
  stafflist1: any;
  stafflistnewrequest: any;
  stafflistapproved: any;
  RoleType: any;
  count: any;
  Department: any;
  Departmentlist: any;
  RoleTypeList: any;
  myDate: any;
  month: any;
  loader: any;
  approved: any;
  currentUrl: any
  id: any;
  SanctionAmount: any;
  period: any;
  staffid: any;
  ApprovedDate: any;
  holidaylist: any;
  approval: any;
  public Attactments = [];
  viewMode = 'tab1';

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.loader = true;
    this.RoleType = "";
    this.approved = 0;
    this.month = new Date().getMonth();
    this.Department = "";
    this.myDate = new Date();
    debugger
    this.roledid = sessionStorage.getItem('roledid');
    if (this.roledid == 2) {
      debugger
      this.DigiofficeService.GetEmployeeLoans()
        .subscribe({
          next: data => {
            this.stafflist = data;
            this.stafflistnewrequest = this.stafflist.filter((x: { status: string, supervisor: string }) => x.status == 'HR Pending' && x.supervisor == sessionStorage.getItem('staffid'))
            this.stafflistapproved = this.stafflist.filter((x: { status: string, supervisor: string }) => x.status == 'HR Approved' && x.supervisor == sessionStorage.getItem('staffid'))
            this.count = this.stafflistapproved.length;
            this.count = this.stafflistapproved.length;
            this.stafflistCopy = this.stafflist
            this.loader = false
          }, error: (err) => {
            Swal.fire('Issue in Getting Employee Loans');
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
    else if (this.roledid == 9) {
      debugger
      this.DigiofficeService.GetEmployeeLoans()
        .subscribe({
          next: data => {
            debugger
            this.stafflist = data;
            this.stafflistnewrequest = this.stafflist.filter((x: { status: string }) => x.status == 'HR Pending')
            this.count = this.stafflistnewrequest.length;
            this.stafflistapproved = this.stafflist.filter((x: { status: string }) => x.status == 'HR Approved')
            this.count = this.stafflistapproved.length;
            this.stafflistCopy = this.stafflist
            this.loader = false
          }, error: (err) => {
            Swal.fire('Issue in Getting Employee Loans ');
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
    else if (this.roledid == 8) {
      debugger
      this.DigiofficeService.GetEmployeeLoans()
        .subscribe({
          next: data => {
            debugger
            this.stafflist = data;
            this.stafflistnewrequest = this.stafflist.filter((x: { status: string }) => x.status == 'HR Pending')
            this.count = this.stafflistnewrequest.length;
            this.stafflistapproved = this.stafflist.filter((x: { status: string }) => x.status == 'HR Approved')
            this.count = this.stafflistapproved.length;
            this.stafflistCopy = this.stafflist;
            this.loader = false
          }, error: (err) => {
            Swal.fire('Issue in Getting Employee Loans ');
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
    else if (this.roledid == 17) {
      debugger
      this.DigiofficeService.GetEmployeeLoans()
        .subscribe({
          next: data => {
            debugger
            this.stafflist = data;
            this.stafflistnewrequest = this.stafflist.filter((x: { status: string }) => x.status == 'HR Pending' || x.status == null)
            this.count = this.stafflistnewrequest.length;
            this.stafflistapproved = this.stafflist.filter((x: { status: string }) => x.status == 'HR Approved' && x.status != null)
            this.count = this.stafflistapproved.length;
            this.stafflistCopy = this.stafflist;
            this.loader = false
          }, error: (err) => {
            Swal.fire('Issue in Getting  Employee Loans ');
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

  public getRoleType(event: any) {
    debugger
    this.RoleType = event.target.value;
  }

  public FilterRoleType() {
    if (this.roledid == 2) {
      debugger
      this.DigiofficeService.GetEmployeeLoans()
        .subscribe({
          next: data => {
            debugger
            this.stafflist = data;
            this.stafflistnewrequest = this.stafflist.filter((x: { status: string, supervisor: string, month: string, role: string }) => x.status == 'HR Pending' && x.supervisor == sessionStorage.getItem('staffid') && x.role == this.RoleType)
            this.stafflistapproved = this.stafflist.filter((x: { status: string, supervisor: string, month: string, role: string }) => x.status != 'HR Pending' && x.supervisor == sessionStorage.getItem('staffid') && x.role == this.RoleType)
            this.count = this.stafflistapproved.length;
            this.count = this.stafflistapproved.length;
            this.stafflistCopy = this.stafflist
          }, error: (err) => {
            Swal.fire('Issue in Getting Employee Loans');
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
    else if (this.roledid == 9) {
      debugger
      this.DigiofficeService.GetEmployeeLoans()
        .subscribe({
          next: data => {
            debugger
            this.stafflist = data;
            this.stafflistnewrequest = this.stafflist.filter((x: { status: string, month: string, role: string }) => x.status == 'HR Pending' && x.role == this.RoleType)
            this.count = this.stafflistnewrequest.length;
            this.stafflistapproved = this.stafflistnewrequest = this.stafflist.filter((x: { status: string, month: string, role: string }) => x.status != 'HR Pending' && x.role == this.RoleType)
            this.count = this.stafflistapproved.length;
            this.stafflistCopy = this.stafflist;
          }, error: (err) => {
            Swal.fire('Issue in Getting Employee Loans');
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
    else if (this.roledid == 8) {
      debugger
      this.DigiofficeService.GetEmployeeLoans()
        .subscribe({
          next: data => {
            debugger
            this.stafflist = data;
            this.stafflistnewrequest = this.stafflist.filter((x: { status: string, month: string, role: string }) => x.status == 'Manager Approved,HR Pending,Payroll Approved,Finance Pending' && x.role == this.RoleType)
            this.count = this.stafflistnewrequest.length;
            this.stafflistapproved = this.stafflist.filter((x: { status: string, month: string, role: string }) => x.status != 'Manager Approved,HR Pending,Payroll Approved,Finance Pending' && x.role == this.RoleType)
            this.count = this.stafflistapproved.length;
            this.stafflistCopy = this.stafflist;
          }, error: (err) => {
            Swal.fire('Issue in Getting Employee Loans');
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
    else if (this.roledid == 17) {
      debugger
      this.DigiofficeService.GetEmployeeLoans()
        .subscribe({
          next: data => {
            debugger
            this.stafflist = data;
            this.stafflistnewrequest = this.stafflist.filter((x: { status: string, month: string, role: string }) => x.status == 'Manager Approved,HR Pending,Payroll Pending,Finance Pending' && x.role == this.RoleType)
            this.count = this.stafflistnewrequest.length;
            this.stafflistapproved = this.stafflist.filter((x: { status: string, month: string, role: string }) => x.status != 'Manager Approved,HR Pending,Payroll Pending,Finance Pending' && x.role == this.RoleType)
            this.count = this.stafflistapproved.length;
            this.stafflistCopy = this.stafflist
          }, error: (err) => {
            Swal.fire('Issue in Getting Employee Loans');
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

  public filterByDepartment() {
    debugger
    this.DigiofficeService.GetMyDetails()
      .subscribe({
        next: data => {
          debugger
          this.stafflist = data.filter(x => x.department == this.Department);
          this.count = this.stafflist.length;
        }, error: (err) => {
          Swal.fire('Issue in Getting My Details');
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

  public filterByMonth() {
    debugger
    if (this.roledid == 2) {
      debugger
      this.DigiofficeService.GetEmployeeLoans()
        .subscribe({
          next: data => {
            debugger
            this.stafflist = data;
            this.stafflistnewrequest = this.stafflist.filter((x: { status: string, supervisor: string, month: string }) => x.status == 'HR Pending' && x.supervisor == sessionStorage.getItem('staffid') && x.month == this.month + 1)
            this.stafflistapproved = this.stafflist.filter((x: { status: string, supervisor: string, month: string }) => x.status != 'HR Pending' && x.supervisor == sessionStorage.getItem('staffid') && x.month == this.month + 1)
            this.count = this.stafflistapproved.length;
            this.count = this.stafflistapproved.length;
            this.stafflistCopy = this.stafflist
          }, error: (err) => {
            Swal.fire('Issue in Getting Employee Loans');
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
    else if (this.roledid == 9) {
      debugger
      this.DigiofficeService.GetEmployeeLoans()
        .subscribe({
          next: data => {
            debugger
            this.stafflist = data;
            this.stafflistnewrequest = this.stafflist.filter((x: { status: string, month: string }) => x.status == 'Manager Approved,HR Pending,Payroll Pending,Finance Pending' && x.month == this.month + 1)
            this.count = this.stafflistnewrequest.length;
            this.stafflistapproved = this.stafflistnewrequest = this.stafflist.filter((x: { status: string, month: string }) => x.status == 'Manager Approved,HR Pending,Payroll Pending,Finance Pending' && x.month == this.month + 1)
            this.count = this.stafflistapproved.length;
            this.stafflistCopy = this.stafflist
          }, error: (err) => {
            Swal.fire('Issue in Getting Employee Loans');
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
    else if (this.roledid == 8) {
      debugger
      this.DigiofficeService.GetEmployeeLoans()
        .subscribe({
          next: data => {
            debugger
            this.stafflist = data;
            this.stafflistnewrequest = this.stafflist.filter((x: { status: string, month: string }) => x.status == 'Manager Approved,HR Pending,Payroll Approved,Finance Pending' && x.month == this.month + 1)
            this.count = this.stafflistnewrequest.length;
            this.stafflistapproved = this.stafflist.filter((x: { status: string, month: string }) => x.status != 'Manager Approved,HR Pending,Payroll Approved,Finance Pending' && x.month == this.month + 1)
            this.count = this.stafflistapproved.length;
            this.stafflistCopy = this.stafflist
          }, error: (err) => {
            Swal.fire('Issue in Getting Employee Loans');
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
    else if (this.roledid == 17) {
      debugger
      this.DigiofficeService.GetEmployeeLoans()
        .subscribe({
          next: data => {
            debugger
            this.stafflist = data;
            this.stafflistnewrequest = this.stafflist.filter((x: { status: string, month: string }) => x.status == 'Manager Approved,HR Pending,Payroll Pending,Finance Pending' && x.month == this.month + 1)
            this.count = this.stafflistnewrequest.length;
            this.stafflistapproved = this.stafflist.filter((x: { status: string, month: string }) => x.status != 'Manager Approved,HR Pending,Payroll Pending,Finance Pending' && x.month == this.month + 1)
            this.count = this.stafflistapproved.length;
            this.stafflistCopy = this.stafflist
          }, error: (err) => {
            Swal.fire('Issue in Getting Employee Loans');
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

  public Approved() {
    this.approved = 1
  }

  public Pending() {
    this.approved = 0
  }

  public filterStaff() {
    debugger
    let searchCopy = this.term.toLowerCase();
    this.stafflistnewrequest = this.stafflistCopy.filter((x: { name: string }) =>
      x.name.toLowerCase().includes(searchCopy));
    this.stafflistapproved = this.stafflistCopy.filter((x: { name: string }) =>
      x.name.toLowerCase().includes(searchCopy));
  }

  public getdate(event: any) {
    debugger
    this.date = event.target.value;
    this.DigiofficeService.GetEmployeeLoans()
      .subscribe({
        next: data => {
          debugger
          this.stafflist = data.filter(x => x.filterdate == this.date);
        }, error: (err) => {
          Swal.fire('Issue in Getting Employee Loans');
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

  public CancelLeave(list: any) {
    debugger
    this.DigiofficeService.DeleteEmployeeLoans(list.id)
      .subscribe({
        next: data => {
          debugger
          Swal.fire('Cancelled Successfully');
          this.ngOnInit();
        }, error: (err) => {
          Swal.fire('Issue in Deleting Employee Loans');
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

  public Approve(item: any) {
    debugger
    this.id = item.id;
    this.LoanType = item.loanType,
      this.staffid = item.staffID
  }

  public Reject(item: any) {
    debugger
    this.id = item.id;
    this.LoanType = item.loanType
    this.staffid = item.staffID
  }

  public ApproveEmployeeloan() {
    debugger
    var hb = {
      ID: this.id,
      Status: 'HR Approved',
      HRComments: this.Comments,
      SanctionAmount: this.SanctionAmount,
      period: this.period
    }
    this.DigiofficeService.UpdateEmployeeLoansByHR(hb)
      .subscribe({
        next: data => {
          debugger
          Swal.fire("Updated Successfully");
          this.getpassword('HR Approved', this.staffid)
          location.reload();
        }, error: (err) => {
          Swal.fire('Issue in Updating Employee Loans By HR');
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

  public RejectEmployeeloan() {
    var hb = {
      ID: this.id,
      Status: 'HR Rejected',
      HRComments: this.Comments,
      SanctionAmount: 0,
      period: 0
    }
    this.DigiofficeService.UpdateEmployeeLoansByHR(hb)
      .subscribe({
        next: data => {
          debugger
          Swal.fire("Updated Successfully");
          this.getpassword('HR Rejected', this.staffid)
          location.reload();
        }, error: (err) => {
          Swal.fire('Issue in  Updating Employee Loans By HR');
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
          Swal.fire('Issue in Getting My Details');
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

  public sendemail(status: any) {
    var entity1 = {
      'emailto': this.employeeemail,
      'emailsubject': 'Loan Application',
      'emailbody': 'Hi , <br> ' + this.employeename + ' your loan request status has changed to ' + status + ' by your HR , Please Login to Digioffice To View It.<br> Thanks <br> Team Digi-Office',
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
          Swal.fire('Issue in Send Email');
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