import { Component, OnInit } from '@angular/core';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';
@Component({
  selector: 'app-pay-roll-runs-form',
  templateUrl: './pay-roll-runs-form.component.html',
  styleUrls: ['./pay-roll-runs-form.component.css']
})

export class PayRollRunsFormComponent implements OnInit {

  constructor(public DigiofficeService: DigipayrollserviceService, public router: Router, private datePipe: DatePipe) {
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }
  viewMode = 'tab1';
  loader: any;
  Role: any;
  stafflist: any;
  term: any;
  RoleTypeList: any;
  value: any;
  result: any;
  employeelist: any;
  Payrollvis: any;
  Showpayroll: any;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  minDate = new Date();
  p: any = 1;
  count1: any = 10;
  latestdate: any;
  cutofflist: any;
  currentUrl: any;
  ID1: any = [];
  enddate: any;
  department_name: any;
  totalamount: any;
  employeelistCopy: any;
  thirteenthmonthpayroll: any;
  uniquelist: any;
  Search: any;
  LOPDays: any;
  NoOfDays: any;
  EmployeeID: any
  temp: any;
  IntID: any
  PrevLOPDays: any;
  StaffSalaryReports: any;
  public ID: any = [];
  sssrate: any;
  ss_ec: any;
  ss_er: any;
  startmonth: any;
  endmonth: any;
  startyear: any;
  endyear: any;
  myDate: any;
  companylist: any;
  companyname: any;
  Address: any;
  paginigec: any;
  dob: any;
  PhilHealthEC: any;
  joiningdate: any;
  seleconebtn: any;
  selecallbtn: any;
  fullname: any;
  payrolldate: any;
  datecovered: any;
  department: any;
  role: any;
  tin: any;
  PhilHealth: any;
  SSS: any;
  hdmf: any;
  deminimisamount: any;
  BaseSalary: any;
  lopamount: any;
  sssamount: any;
  philHealthContribution: any;
  pagBig: any;
  tax: any;
  netMonthSalary: any;
  deductions: any;
  startdate: any;
  id: any;
  GrossSalary: any;
  deniminimis_amount: any;
  semimonthly: any;
  basicday: any;
  basichour: any;
  employeelist2: any;
  companyloan: any;
  ssssalaryloan: any;
  ssscalamity: any;
  hdmfcalamityloan: any;
  hdmfsalaryloan: any;
  benefits: any;

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.myDate = new Date();
    this.latestdate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    debugger
    this.GetPayrollCutOffDate();
    this.Role = "Select"
    this.department_name = "Select"
    this.GetDepartment();
    this.GetEmployeeSalary();
    this.GetRoleType();
  }

  public GetRoleType() {
    this.DigiofficeService.GetRoleType()
      .subscribe({
        next: data => {
          debugger
          this.RoleTypeList = data;
          this.loader = false;
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

  public GetPayrollCutOffDate() {
    this.DigiofficeService.GetPayrollCutOffDate()
      .subscribe({
        next: data => {
          debugger
          this.cutofflist = data.filter(x => x.filterdate == this.latestdate);
          this.loader = false;
        }, error: (err) => {
          Swal.fire('Issue in Getting Payroll Cutoff Date');
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

  public GetEmployeeSalary() {
    this.DigiofficeService.GetEmployeeSalary()
      .subscribe({
        next: data => {
          debugger
          this.employeelist = data;
          this.loader = false;
        }, error: (err) => {
          Swal.fire('Issue in Getting Employee Salary');
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

  public getdate(event: any) {
    debugger
    this.enddate = event.target.value;
  }

  public GetDepartment() {
    debugger
    this.DigiofficeService.GetDepartment()
      .subscribe({
        next: data => {
          debugger
          this.result = data;
          this.loader = false;
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

  public Departmentfilter() {
    if (this.startdate == undefined || this.enddate == undefined) {
      Swal.fire('Please Select Start Date and End Date')
    }
    else {
      this.DigiofficeService.Get_Employees_For_Payroll(this.startdate, this.enddate)
        .subscribe({
          next: data => {
            debugger
            this.stafflist = data.filter(x => x.department_name == this.department_name && x.daysworked > 0);
            const key = 'id';
            const key1 = 'month'
            this.uniquelist = [...new Map(this.stafflist.map((item: { [x: string]: any; }) =>
              [(item[key]), item])).values()]
          }, error: (err) => {
            Swal.fire('Issue in Getting Employees For Payroll');
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

  public Rolefilter() {
    if (this.startdate == undefined || this.enddate == undefined) {
      Swal.fire('Please Select Start Date and End Date')
    }
    else {
      this.DigiofficeService.Get_Employees_For_Payroll(this.startdate, this.enddate)
        .subscribe({
          next: data => {
            debugger
            this.stafflist = data.filter(x => x.role == this.Role && x.daysworked > 0);
            const key = 'id';
            const key1 = 'month'
            this.uniquelist = [...new Map(this.stafflist.map((item: { [x: string]: any; }) =>
              [(item[key]), item])).values()]
            this.totalamount = 0;
            for (let i = 0; i < this.uniquelist.length; i++) {
              this.totalamount += this.uniquelist[i].netMonthSalary;
            }
            this.loader = false;
          }, error: (err) => {
            Swal.fire('Issue in Getting Employees For Payroll');
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

  public selectALL1(event: any) { // pass true or false to check or uncheck all
    debugger;
    this.selecallbtn = true;
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].type == "checkbox") {
        inputs[i].checked = event.currentTarget.checked;
        // This way it won't flip flop them and will set them all to the same value which is passed into the function
      }
    }
  }

  public FilterPayroll() {
    this.DigiofficeService.Get_Employees_For_Payroll(this.startdate, this.enddate)
      .subscribe({
        next: data => {
          debugger
          this.stafflist = data;
          const key = 'id';
          const key1 = 'month'
          this.uniquelist = [...new Map(this.stafflist.map((item: { [x: string]: any; }) =>
            [(item[key]), item])).values()]
          this.employeelistCopy = this.uniquelist
          let searchCopy = this.Search.toLowerCase();
          this.uniquelist = this.employeelistCopy.filter((x: { name: string, mobile: Number, emailID: string }) =>
            x.name.toLowerCase().includes(searchCopy) ||
            x.emailID.toString().includes(searchCopy));
          this.loader = false;
        }, error: (err) => {
          Swal.fire('Issue in Getting Employees For Payroll');
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

  public getemployeedetails() {
    if (this.startdate == undefined || this.enddate == undefined) {
      Swal.fire('Please Select Start Date and End Date')
    }
    else {
      if (this.startdate > this.enddate) {
        Swal.fire('End Date Must Be Greater Than Start Date')
      }
      else {
        this.loader = true
        this.DigiofficeService.Get_Employees_For_Payroll(this.startdate, this.enddate)
          .subscribe({
            next: data => {
              debugger
              this.stafflist = data.filter(x => x.daysworked > 0);
              const key = 'id';
              const key1 = 'month'
              this.uniquelist = [...new Map(this.stafflist.map((item: { [x: string]: any; }) =>
                [(item[key]), item])).values()]
              this.loader = false
            }, error: (err) => {
              Swal.fire('Issue in Getting Employees For Payroll');
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
  }

  public SelectAll() {
    this.seleconebtn = 0
    debugger;
    var date1 = new Date(this.startdate);
    var date2 = new Date(this.enddate);
    var Time = date2.getTime() - date1.getTime();
    let days: any = Time / (1000 * 3600 * 24);
    if (days >= 15) {
      this.NoOfDays = days;
    }
    else {
      this.NoOfDays = days + 1;
    }
    if (this.startdate == undefined || this.enddate == undefined) {
      Swal.fire('Please Select Start Date and End Date')
    }
    else if (this.startdate > this.enddate) {
      Swal.fire('End Date must be greater than start date');
    }
    Swal.fire({
      title: 'Are you sure?',
      text: 'To Run Payroll For This Period!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Accept it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.NoOfDays == 15 || this.NoOfDays == 30 || this.NoOfDays == 31 || this.NoOfDays == 28) {
          if (this.NoOfDays == 15) {
            if (this.uniquelist.every((val: { checked: boolean; }) => val.checked == true)) {
              this.IntID = false;
              this.ID = [];
              this.uniquelist.forEach((val: { checked: boolean; }) => { val.checked == false });
            }
            else {
              this.ID1 = [];
              debugger
              this.uniquelist.forEach((val: { checked: boolean; }) => { val.checked == true });
              this.IntID = true;
              Swal.fire("Payroll Processing Completed");
              this.InsertNotification();
              for (let i = 0; i < this.uniquelist.length; i++) {
                debugger;
                this.ID1.push(this.uniquelist[i].id);
                this.ID1[i];
                const format = 'yyyy-MM-dd';
                const myDate = this.startdate;
                const locale = 'en-US';
                this.startdate = formatDate(myDate, format, locale);
                this.DigiofficeService.GetStaffLeavesForPayrollByDate(this.startdate, this.enddate, this.ID1[i])
                  .subscribe({
                    next: data => {
                      debugger
                      if (data.length == 0) {
                        this.LOPDays = 0;
                        this.DigiofficeService.Get_Salary_Splitsfor15days(this.ID1[i], this.LOPDays, this.startdate, this.enddate)
                          .subscribe({
                            next: data => {
                              debugger
                              this.StaffSalaryReports = data;
                              this.ID1 = [];
                              location.href = '#/PayRoll'
                            }, error: (err) => {
                              Swal.fire('Issue in Getting Salary Splits For 15 Days');
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
                      } else {
                        this.LOPDays = data[0].noOfDays;
                        if (this.LOPDays <= 2) {
                          this.LOPDays = this.LOPDays;
                        }
                        else {
                          this.LOPDays = this.LOPDays - 2;
                        }
                        this.DigiofficeService.Get_Salary_Splitsfor15days(this.ID1[i], this.LOPDays, this.startdate, this.enddate)
                          .subscribe({
                            next: data => {
                              debugger
                              this.StaffSalaryReports = data;
                              this.ID1 = [];
                              location.href = '#/PayRoll'
                              this.loader = false;
                            }, error: (err) => {
                              Swal.fire('Issue in Getting Salary Splits For 15 Days');
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
                    }, error: (err) => {
                      Swal.fire('Issue in Getting Staff Leaves For Payroll By Date');
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
          }
          else {
            if (this.uniquelist.every((val: { checked: boolean; }) => val.checked == true)) {
              this.IntID = false;
              this.ID = [];
              this.uniquelist.forEach((val: { checked: boolean; }) => { val.checked == false });
            }
            else {
              this.ID1 = [];
              debugger
              this.uniquelist.forEach((val: { checked: boolean; }) => { val.checked == true });
              this.IntID = true;
              Swal.fire("Payroll Processing Completed");
              this.InsertNotification();
              for (let i = 0; i < this.uniquelist.length; i++) {
                debugger;
                this.ID1.push(this.uniquelist[i].id);
                this.ID1[i];
                this.DigiofficeService.GetStaffLeavesForPayrollByDate(this.startdate, this.enddate, this.ID1[i])
                  .subscribe({
                    next: data => {
                      debugger
                      if (data.length == 0) {
                        this.LOPDays = 0;
                        this.DigiofficeService.Get_Salary_Splits(this.ID1[i], this.LOPDays, this.startdate, this.enddate)
                          .subscribe({
                            next: data => {
                              debugger
                              this.StaffSalaryReports = data;
                              this.ID1 = [];
                              location.href = '#/PayRoll'
                            }, error: (err) => {
                              Swal.fire('Issue in Getting Salary Splits');
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
                      } else {
                        this.LOPDays = data[0].noOfDays;
                        if (this.LOPDays <= 2) {
                          this.LOPDays = this.LOPDays;
                        }
                        else {
                          this.LOPDays = this.LOPDays - 2;
                        }
                        this.DigiofficeService.Get_Salary_Splits(this.ID1[i], this.LOPDays, this.startdate, this.enddate)
                          .subscribe({
                            next: data => {
                              debugger
                              this.StaffSalaryReports = data;
                              this.ID1 = [];
                              location.href = '#/PayRoll'
                            }, error: (err) => {
                              Swal.fire('Issue in Getting Salary Splits');
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
                      this.loader = false;
                    }, error: (err) => {
                      Swal.fire('Issue in Getting Staff Leaves For Payroll By Date');
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
          }
        }
        else {
          Swal.fire('Range for Payroll either 15 days or 30 days')
        }
      }
    })
  }

  public InsertNotification() {
    debugger
    var entity = {
      'Date': new Date(),
      'Event': 'Payroll Run',
      'FromUser': 'Admin',
      'ToUser': 'Admin',
      'Message': 'Payroll Ran Successfully from ' + this.startdate + 'to' + this.enddate,
      'Photo': 'Null',
      'Building': 'Dynamics 1',
      'UserID': sessionStorage.getItem('staffid'),
      'NotificationTypeID': 16,
      'VendorID': 0
    }
    this.DigiofficeService.InsertNotification(entity)
      .subscribe({
        next: data => {
          debugger
          this.loader = false;
        }, error: (err) => {
          Swal.fire('Issue in Inserting Notification');
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

  public getempdetails(evn: any) {
    this.DigiofficeService.GetEmployeeSalary()
      .subscribe({
        next: data => {
          debugger
          this.employeelist = data.filter(x => x.id == evn.id && x.startdate1 == this.startdate && x.enddate1 == this.enddate);
          this.fullname = this.employeelist[0].staffname + this.employeelist[0].lastName
          this.sssrate = this.employeelist[0].contribution,
            this.ss_ec = this.employeelist[0].ss_ec,
            this.ss_er = this.employeelist[0].ss_er,
            this.startmonth = this.employeelist[0].startmonth,
            this.endmonth = this.employeelist[0].endmonth,
            this.startyear = this.employeelist[0].startyear,
            this.endyear = this.employeelist[0].endyear,
            this.paginigec = this.employeelist[0].pagBig / 2,
            this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
          this.dob = this.employeelist[0].dob,
            this.joiningdate = this.employeelist[0].joiningDate,
            this.PhilHealth = this.employeelist[0].philHealth,
            this.PhilHealthEC = this.employeelist[0].philHealthContribution / 2,
            this.DigiofficeService.GetCompanyDetails()
              .subscribe({
                next: data => {
                  debugger
                  this.companylist = data
                  this.companyname = this.companylist[0].companyName,
                    this.Address = this.companylist[0].address
                }, error: (err) => {
                  Swal.fire('Issue in Getting Company Details');
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
          Swal.fire('Issue in Getting Employee Salary');
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

  public getCheckbocdetails(evn: any) {
    debugger
    this.seleconebtn = true;
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
      debugger
      this.temp.forEach((val: { checked: boolean; }) => { val.checked = true });
      this.IntID = true;
      this.ID.push(evn.id);
    }
  }

  public Accept() {
    debugger;
    for (let i = 0; i < this.ID.length; i++) {
      debugger;
      this.EmployeeID = this.ID[i];
      this.DigiofficeService.GetEmployeeSalary()
        .subscribe({
          next: data => {
            debugger
            this.employeelist = data.filter(x => x.id == this.ID[i] && x.startdate1 == this.startdate && x.enddate1 == this.enddate);
            if (this.employeelist.length != 0) {
              Swal.fire({
                title: 'Are you sure?',
                text: 'Payroll Was Alreay Run For This Period Do You Want To Overwrite',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, Accept it!',
                cancelButtonText: 'No, keep it'
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire({
                    title: 'Are you sure?',
                    text: 'To Run Payroll In This Period',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, Accept it!',
                    cancelButtonText: 'No, keep it'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      debugger
                      for (let i = 0; i < this.ID.length; i++) {
                        debugger;
                        this.EmployeeID = this.ID[i];
                        this.DigiofficeService.GetStaffLeavesForPayrollByDate(this.startdate, this.enddate, this.ID[i])
                          .subscribe({
                            next: data => {
                              debugger
                              if (data.length == 0) {
                                this.LOPDays = 0;
                                this.DigiofficeService.Get_Salary_Splitsfor15days(this.ID[i], this.LOPDays, this.startdate, this.enddate)
                                  .subscribe({
                                    next: data => {
                                      debugger
                                      this.StaffSalaryReports = data;
                                      Swal.fire(
                                        'Payroll Ran Successfully!',
                                        'Payroll run has been Completed',
                                        'success'
                                      )
                                      this.Payrollvis = true
                                      this.InsertNotification();
                                      location.href = '#/PayRoll'
                                    }, error: (err) => {
                                      Swal.fire('Issue in Getting Salary Splits For 15 Days');
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
                              } else {
                                this.LOPDays = data[0].noOfDays;
                                this.DigiofficeService.GetStaffLeavesForPayrollByDate(this.startdate, this.enddate, this.ID[i])
                                  .subscribe({
                                    next: data => {
                                      debugger
                                      this.PrevLOPDays = data[0].noOfDays;
                                      if (this.LOPDays > 2) {
                                        if (this.PrevLOPDays == 0) {
                                          this.LOPDays = this.LOPDays;
                                          this.DigiofficeService.Get_Salary_Splitsfor15days(this.ID[i], this.LOPDays, this.startdate, this.enddate)
                                            .subscribe({
                                              next: data => {
                                                debugger
                                                this.StaffSalaryReports = data;
                                                Swal.fire(
                                                  'Payroll Ran Successfully!',
                                                  'Payroll run has been Completed',
                                                  'success'
                                                )
                                                this.ID = [];
                                                this.Payrollvis = true;
                                                this.InsertNotification();
                                                location.href = '#/PayRoll'
                                              }, error: (err) => {
                                                Swal.fire('Issue in Getting Salary Splits For 15 Days');
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
                                        else if (this.PrevLOPDays != 0) {
                                          let ActualLOPDays = Number(this.LOPDays) + Number(this.PrevLOPDays);
                                          if (ActualLOPDays > 4) {
                                            this.LOPDays = Number(ActualLOPDays) - 4;
                                            this.DigiofficeService.Get_Salary_Splitsfor15days(this.ID[i], this.LOPDays, this.startdate, this.enddate)
                                              .subscribe({
                                                next: data => {
                                                  debugger
                                                  this.StaffSalaryReports = data;
                                                  Swal.fire(
                                                    'Payroll Ran Successfully!',
                                                    'Payroll run has been Completed',
                                                    'success'
                                                  )
                                                  this.ID = [];
                                                  this.Payrollvis = true;
                                                  this.InsertNotification();
                                                  location.href = '#/PayRoll'
                                                }, error: (err) => {
                                                  Swal.fire('Issue in Getting Salary Splits For 15 Days');
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
                                      }
                                      else {
                                        if (this.LOPDays <= 2 || this.PrevLOPDays == 0) {
                                          this.LOPDays = 0;
                                          this.DigiofficeService.Get_Salary_Splitsfor15days(this.ID[i], this.LOPDays, this.startdate, this.enddate)
                                            .subscribe({
                                              next: data => {
                                                debugger
                                                this.StaffSalaryReports = data;
                                                Swal.fire(
                                                  'Payroll Ran Successfully!',
                                                  'Payroll run has been Completed',
                                                  'success'
                                                )
                                                this.ID = [];
                                                this.Payrollvis = true
                                                this.InsertNotification();
                                                location.href = '#/PayRoll'
                                              }, error: (err) => {
                                                Swal.fire('Issue in Getting Salary Splits For 15 Days');
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
                                    }, error: (err) => {
                                      Swal.fire('Issue in Getting Staff Leaves For Payroll By Date');
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
                            }, error: (err) => {
                              Swal.fire('Issue in Getting Staff Leaves For Payroll By Date');
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
                      // For more information about handling dismissals please visit
                      // https://sweetalert2.github.io/#handling-dismissals
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                      Swal.fire(
                        'Cancelled',
                        'Your imaginary file is safe :)',
                        'error'
                      )
                    }
                  })
                }
              })
            }
            else {
              Swal.fire({
                title: 'Are you sure?',
                text: 'To Run Payroll For This Period!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, Accept it!',
                cancelButtonText: 'No, keep it'
              }).then((result) => {
                if (result.isConfirmed) {
                  debugger
                  for (let i = 0; i < this.ID.length; i++) {
                    debugger;
                    this.EmployeeID = this.ID[i];
                    this.DigiofficeService.GetStaffLeavesForPayrollByDate(this.startdate, this.enddate, this.ID[i])
                      .subscribe({
                        next: data => {
                          debugger
                          if (data.length == 0) {
                            this.LOPDays = 0;
                            this.DigiofficeService.Get_Salary_Splitsfor15days(this.ID[i], this.LOPDays, this.startdate, this.enddate)
                              .subscribe({
                                next: data => {
                                  debugger
                                  this.StaffSalaryReports = data;
                                  Swal.fire(
                                    'Payroll Ran Successfully!',
                                    'Payroll run has been Completed',
                                    'success'
                                  )
                                  this.Payrollvis = true
                                  this.InsertNotification();
                                  location.href = '#/PayRoll'
                                }, error: (err) => {
                                  Swal.fire('Issue in Getting Salary Splits For 15 Days');
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
                          } else {
                            this.LOPDays = data[0].noOfDays;
                            this.DigiofficeService.GetStaffLeavesForPayrollByDate(this.startdate, this.enddate, this.ID[i])
                              .subscribe({
                                next: data => {
                                  debugger
                                  this.PrevLOPDays = data[0].noOfDays;
                                  if (this.LOPDays > 2) {
                                    if (this.PrevLOPDays == 0) {
                                      this.LOPDays = this.LOPDays;
                                      this.DigiofficeService.Get_Salary_Splitsfor15days(this.ID[i], this.LOPDays, this.startdate, this.enddate)
                                        .subscribe({
                                          next: data => {
                                            debugger
                                            this.StaffSalaryReports = data;
                                            Swal.fire(
                                              'Payroll Ran Successfully!',
                                              'Payroll run has been Completed',
                                              'success'
                                            )
                                            this.ID = [];
                                            this.Payrollvis = true;
                                            this.InsertNotification();
                                            location.href = '#/PayRoll'
                                          }, error: (err) => {
                                            Swal.fire('Issue in Getting Salary Splits For 15 Days');
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
                                    else if (this.PrevLOPDays != 0) {
                                      let ActualLOPDays = Number(this.LOPDays) + Number(this.PrevLOPDays);
                                      if (ActualLOPDays > 4) {
                                        this.LOPDays = Number(ActualLOPDays) - 4;
                                        this.DigiofficeService.Get_Salary_Splitsfor15days(this.ID[i], this.LOPDays, this.startdate, this.enddate)
                                          .subscribe({
                                            next: data => {
                                              debugger
                                              this.StaffSalaryReports = data;
                                              Swal.fire(
                                                'Payroll Ran Successfully!',
                                                'Payroll run has been Completed',
                                                'success'
                                              )
                                              this.ID = [];
                                              this.Payrollvis = true;
                                              this.InsertNotification();
                                              location.href = '#/PayRoll'
                                            }, error: (err) => {
                                              Swal.fire('Issue in Getting Salary Splits For 15 Days');
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
                                  }
                                  else {
                                    if (this.LOPDays <= 2 || this.PrevLOPDays == 0) {
                                      this.LOPDays = 0;
                                      this.DigiofficeService.Get_Salary_Splitsfor15days(this.ID[i], this.LOPDays, this.startdate, this.enddate)
                                        .subscribe({
                                          next: data => {
                                            debugger
                                            this.StaffSalaryReports = data;
                                            Swal.fire(
                                              'Payroll Ran Successfully!',
                                              'Payroll run has been Completed',
                                              'success'
                                            )
                                            this.ID = [];
                                            this.Payrollvis = true
                                            this.InsertNotification();
                                            location.href = '#/PayRoll'
                                          }, error: (err) => {
                                            Swal.fire('Issue in Getting Salary Splits For 15 Days');
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
                                }, error: (err) => {
                                  Swal.fire('Issue in Getting Staff Leaves For Payroll By Date');
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
                        }, error: (err) => {
                          Swal.fire('Issue in Getting Staff Leaves For Payroll By Date');
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
                  // For more information about handling dismissals please visit
                  // https://sweetalert2.github.io/#handling-dismissals
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                  Swal.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                  )
                }
              })
            }
          }, error: (err) => {
            Swal.fire('Issue in Getting Employee Salary');
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

  public SinglePreliminary() {
    for (let i = 0; i < this.ID.length; i++) {
      debugger;
      this.EmployeeID = this.ID[i];
      Swal.fire({
        title: 'Are you sure?',
        text: 'Your Not Punched in Days will be considered  as LOP Days , If You Have Not Applied Leave!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Accept it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.isConfirmed) {
          debugger
          for (let i = 0; i < this.ID.length; i++) {
            debugger;
            this.EmployeeID = this.ID[i];
            this.DigiofficeService.GetStaffLeavesForPayrollByDate(this.startdate, this.enddate, this.ID[i])
              .subscribe({
                next: data => {
                  debugger
                  if (data.length == 0) {
                    this.LOPDays = 0;
                    this.DigiofficeService.Get_PreliminaryReport(this.ID[i], this.LOPDays, this.startdate, this.enddate)
                      .subscribe({
                        next: data => {
                          debugger
                          this.StaffSalaryReports = data;
                          this.Showpayroll = 1
                          this.Payrollvis = true
                        }, error: (err) => {
                          Swal.fire('Issue in Getting Preliminary Report');
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
                  } else {
                    this.LOPDays = data[0].noOfDays;
                    this.DigiofficeService.GetStaffLeavesForPayrollByDate(this.startdate, this.enddate, this.ID[i])
                      .subscribe({
                        next: data => {
                          debugger
                          this.PrevLOPDays = data[0].noOfDays;
                          if (this.LOPDays > 2) {
                            if (this.PrevLOPDays == 0) {
                              this.LOPDays = this.LOPDays;
                              this.DigiofficeService.Get_PreliminaryReport(this.ID[i], this.LOPDays, this.startdate, this.enddate)
                                .subscribe({
                                  next: data => {
                                    debugger
                                    this.StaffSalaryReports = data;
                                    this.Showpayroll = 1
                                    this.ID = [];
                                    this.Payrollvis = true;
                                  }, error: (err) => {
                                    Swal.fire('Issue in Getting Preliminary Report');
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
                            else if (this.PrevLOPDays != 0) {
                              let ActualLOPDays = Number(this.LOPDays) + Number(this.PrevLOPDays);
                              if (ActualLOPDays > 4) {
                                this.LOPDays = Number(ActualLOPDays) - 4;
                                this.DigiofficeService.Get_PreliminaryReport(this.ID[i], this.LOPDays, this.startdate, this.enddate)
                                  .subscribe({
                                    next: data => {
                                      debugger
                                      this.StaffSalaryReports = data;
                                      this.Showpayroll = 1
                                      this.ID = [];
                                      this.Payrollvis = true;
                                    }, error: (err) => {
                                      Swal.fire('Issue in Getting Preliminary Report');
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
                          }
                          else {
                            if (this.LOPDays <= 2 || this.PrevLOPDays == 0) {
                              this.LOPDays = 0;
                              this.DigiofficeService.Get_PreliminaryReport(this.ID[i], this.LOPDays, this.startdate, this.enddate)
                                .subscribe({
                                  next: data => {
                                    debugger
                                    this.StaffSalaryReports = data;

                                    this.Showpayroll = 1
                                    this.ID = [];
                                    this.Payrollvis = true
                                  }, error: (err) => {
                                    Swal.fire('Issue in Getting Preliminary Report');
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
                        }, error: (err) => {
                          Swal.fire('Issue in Getting Staff Leaves For Payroll By Date');
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
                }, error: (err) => {
                  Swal.fire('Issue in Getting Staff Leaves For Payroll By Date');
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
          // For more information about handling dismissals please visit
          // https://sweetalert2.github.io/#handling-dismissals
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })
    }
  }

  public SelectAllPreliminary() {
    debugger
    var date1 = new Date(this.startdate);
    var date2 = new Date(this.enddate);
    var Time = date2.getTime() - date1.getTime();
    let days: any = Time / (1000 * 3600 * 24);
    if (days >= 15) {
      this.NoOfDays = days;
    }
    else {
      this.NoOfDays = days + 1;
    }
    if (this.startdate == undefined || this.enddate == undefined) {
      Swal.fire('Please Select Start Date and End Date')
    }
    else if (this.startdate > this.enddate) {
      Swal.fire('End Date must be greater than start date');
    }
    Swal.fire({
      title: 'Are you sure?',
      text: 'Your Not Punched in Days will be considered  as LOP Days , If You Have Not Applied Leave!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Accept it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.NoOfDays == 15 || this.NoOfDays == 30 || this.NoOfDays == 31 || this.NoOfDays == 28) {

          if (this.NoOfDays == 15) {

            if (this.stafflist.every((val: { checked: boolean; }) => val.checked == true)) {
              this.IntID = false;
              this.ID = [];
              this.stafflist.forEach((val: { checked: boolean; }) => { val.checked = false });
            }
            else {
              this.ID1 = [];
              debugger
              this.stafflist.forEach((val: { checked: boolean; }) => { val.checked = true });
              this.IntID = true;
              Swal.fire("Payroll Processing Completed");
              for (let i = 0; i < this.stafflist.length; i++) {
                debugger;
                this.ID1.push(this.stafflist[i].id);
                //this.EmployeeID =
                this.ID1[i];
                this.DigiofficeService.GetStaffLeavesForPayrollByDate(this.startdate, this.enddate, this.ID1[i])
                  .subscribe({
                    next: data => {
                      debugger
                      if (data.length == 0) {
                        this.LOPDays = 0;
                        this.DigiofficeService.Get_PreliminaryReport(this.ID1[i], this.LOPDays, this.startdate, this.enddate)
                          .subscribe({
                            next: data => {
                              debugger
                              this.StaffSalaryReports = data;
                              this.ID1 = [];
                              location.href = '#/PayRoll'
                            }, error: (err) => {
                              Swal.fire('Issue in Getting Preliminary Report');
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
                      } else {
                        this.LOPDays = data[0].noOfDays;
                        if (this.LOPDays <= 2) {
                          this.LOPDays = this.LOPDays;
                        }
                        else {
                          this.LOPDays = this.LOPDays - 2;
                        }
                        this.DigiofficeService.Get_PreliminaryReport(this.ID1[i], this.LOPDays, this.startdate, this.enddate)
                          .subscribe({
                            next: data => {
                              debugger
                              this.StaffSalaryReports = data;
                              this.ID1 = [];
                              location.href = '#/PayRoll'
                            }, error: (err) => {
                              Swal.fire('Issue in Getting Preliminary Report');
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
                    }, error: (err) => {
                      Swal.fire('Issue in Getting Staff Leaves For Payroll By Date');
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
          }
          else {
            if (this.stafflist.every((val: { checked: boolean; }) => val.checked == true)) {
              this.IntID = false;
              this.ID = [];
              this.stafflist.forEach((val: { checked: boolean; }) => { val.checked = false });
            }
            else {
              this.ID1 = [];
              debugger
              this.stafflist.forEach((val: { checked: boolean; }) => { val.checked = true });
              this.IntID = true;
              Swal.fire("Payroll Processing Completed");
              for (let i = 0; i < this.stafflist.length; i++) {
                debugger;
                this.ID1.push(this.stafflist[i].id);
                this.ID1[i];
                this.DigiofficeService.GetStaffLeavesForPayrollByDate(this.startdate, this.enddate, this.ID1[i])
                  .subscribe({
                    next: data => {
                      debugger
                      if (data.length == 0) {
                        this.LOPDays = 0;
                        this.DigiofficeService.Get_Salary_Splits(this.ID1[i], this.LOPDays, this.startdate, this.enddate)
                          .subscribe({
                            next: data => {
                              debugger
                              this.StaffSalaryReports = data;
                              this.ID1 = [];
                              location.href = '#/PayRoll'
                            }, error: (err) => {
                              Swal.fire('Issue in Getting Salary Splits');
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
                      } else {
                        this.LOPDays = data[0].noOfDays;
                        if (this.LOPDays <= 2) {
                          this.LOPDays = this.LOPDays;
                        }
                        else {
                          this.LOPDays = this.LOPDays - 2;
                        }
                        this.DigiofficeService.Get_Salary_Splits(this.ID1[i], this.LOPDays, this.startdate, this.enddate)
                          .subscribe({
                            next: data => {
                              debugger
                              this.StaffSalaryReports = data;
                              this.ID1 = [];
                              location.href = '#/PayRoll'
                            }, error: (err) => {
                              Swal.fire('Issue in Getting Salary Splits');
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
                    }, error: (err) => {
                      Swal.fire('Issue in Getting Staff Leaves For Payroll By Date');
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
          }
        }
        else {
          Swal.fire('Range for Payroll either 15 days or 30 days')
        }
      }
    })
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

  public getpayslip(id: any) {
    this.DigiofficeService.GetPreliminarySalary()
      .subscribe({
        next: data => {
          debugger
          this.id = id;
          this.employeelist2 = data.filter(x => x.staffID == id && x.startdate1 == this.startdate && x.enddate1 == this.enddate);
          this.fullname = this.employeelist2[0].staffname + this.employeelist2[0].lastName,
            this.payrolldate = this.employeelist2[0].enddate,
            this.startdate = this.employeelist2[0].startdate;
          this.enddate = this.employeelist2[0].enddate,
            this.department = this.employeelist2[0].department_name,
            this.role = this.employeelist2[0].role,
            this.tin = this.employeelist2[0].tiNNo,
            this.SSS = this.employeelist2[0].ssSRate,
            this.PhilHealth = this.employeelist2[0].philiHealth,
            this.hdmf = this.employeelist2[0].pagiBigAccountNo,
            this.BaseSalary = this.employeelist2[0].baseSalary,
            this.deniminimis_amount = this.employeelist2[0].deniminimis_amount
          this.deminimisamount = this.employeelist2[0].deMINIMIS,
            this.lopamount = this.employeelist2[0].lopamount,
            this.sssamount = this.employeelist2[0].contribution,
            this.philHealthContribution = this.employeelist2[0].philHealthContribution,
            this.pagBig = this.employeelist2[0].pagBig,
            this.tax = this.employeelist2[0].tax,
            this.netMonthSalary = this.employeelist2[0].netMonthSalary,
            this.GrossSalary = this.employeelist2[0].grossSalary,
            this.semimonthly = Number(this.employeelist2[0].grossSalary) / 2
          this.deductions = (this.employeelist2[0].pagBig + this.employeelist2[0].philiHealth + this.employeelist2[0].contribution + this.employeelist2[0].tax),
            this.basicday = (Math.round((this.employeelist2[0].grossSalary / 30) * 100) / 100).toFixed(2);
          this.basichour = (Math.round((this.basicday / 8) * 100) / 100).toFixed(2);
          this.ssssalaryloan = this.employeelist2[0].ssssalaryloan,
            this.ssscalamity = this.employeelist2[0].ssscalamity,
            this.hdmfcalamityloan = this.employeelist2[0].hdmfcalamityloan,
            this.hdmfsalaryloan = this.employeelist2[0].hdmfsalaryloan,
            this.companyloan = this.employeelist2[0].companyloan
          this.lopamount = this.employeelist2[0].lopamount,
            this.benefits = this.employeelist2[0].benefits
        }, error: (err) => {
          Swal.fire('Issue in Getting Preliminary Salary');
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