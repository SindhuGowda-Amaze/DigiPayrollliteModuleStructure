import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { interval } from 'rxjs';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-preliminary-report',
  templateUrl: './preliminary-report.component.html',
  styleUrls: ['./preliminary-report.component.css']
})

export class PreliminaryReportComponent implements OnInit {

  constructor(public DigiofficeService: DigipayrollserviceService, public router: Router, private datePipe: DatePipe) {
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }
  viewMode = 'tab1';
  stafflist: any;
  term: any;
  value: any;
  employeelist: any;
  Payrollvis: any;
  Showpayroll: any;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  minDate = new Date();
  p: any = 1;
  count1: any = 10;
  count: any;
  Departmentlist: any;
  RoleTypeList: any;
  roleid: any;
  payrollList: any = [];
  date: any;
  RoleType: any;
  Department: any;
  uniquelistcopy: any;
  time: any;
  hh: any;
  mm: any;
  ampm: any;
  enddate: any;
  currentUrl: any;
  uniquelist: any;
  Search: any;
  totalamount: any;
  alluniquelist1: any
  ID1: any = [];
  loader: any;
  LOPDays: any;
  NoOfDays: any;
  alluniquelist: any = [];
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
  empid: any;
  StaffSalaryReports1: any = [];
  uniquelist234: any;
  name: any;
  fileName = 'Preliminary Summary Report.xlsx';
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
  uniquelist2: any;

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.Department = "";
    this.RoleType = "";
    this.GetDepartment();
    debugger
    this.GetPosition();
  }

  public GetPosition() {
    this.DigiofficeService.GetPosition()
      .subscribe({
        next: data => {
          debugger
          this.RoleTypeList = data;
          this.loader = false;
        }, error: (err) => {
          Swal.fire('Issue in Getting Position');
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
    this.DigiofficeService.GetDepartment()
      .subscribe({
        next: data => {
          debugger
          this.Departmentlist = data;
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

  public getemployeedetails() {
    if (this.startdate == undefined || this.enddate == undefined) {
      Swal.fire('Please Select Start Date and End Date')
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
            this.count = this.uniquelist.length;
            this.uniquelistcopy = this.uniquelist;
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

  public filterPreliminary() {
    debugger
    let searchCopy = this.Search.toLowerCase();
    this.uniquelist = this.uniquelistcopy.filter((x: { name: string }) => (x.name.toLowerCase().includes(searchCopy)));
    this.count = this.uniquelist.length;
  }

  public viewpreliminary() {
    this.loader = true;
    this.DigiofficeService.GetPreliminarySalary()
      .subscribe({
        next: data => {
          debugger
          this.payrollList = data.filter(x => x.startdate1 == this.startdate && x.enddate1 == this.enddate);
          const key = "staffID"
          this.getnewlist(key);
          this.alluniquelist = [...new Map(this.payrollList.map((item: { [x: string]: any; }) =>
            [(item[key]), item])).values()]
          this.totalamount = 0;
          for (let i = 0; i < this.alluniquelist.length; i++) {
            this.totalamount += parseFloat(this.alluniquelist[i].netMonthSalary);
          }
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

  public getnewlist(key: any) {
    debugger
    this.alluniquelist1 = Object.entries(this.alluniquelist)
    this.loader = false;
  }

  public SelectAll() {
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
    if (this.NoOfDays == 15 || this.NoOfDays == 30 || this.NoOfDays == 31 || this.NoOfDays == 28) {
      if (this.NoOfDays == 15) {
        if (this.uniquelist.every((val: { checked: boolean; }) => val.checked == true)) {
          this.IntID = false;
          this.ID = [];
          this.uniquelist.forEach((val: { checked: boolean; }) => { val.checked = false });
        }
        else {
          this.ID1 = [];
          debugger
          this.uniquelist.forEach((val: { checked: boolean; }) => { val.checked = true });
          this.IntID = true;
          for (let i = 0; i < this.uniquelist.length; i++) {
            debugger;
            this.loader = true;
            this.ID1.push(this.uniquelist[i].id);
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
                          this.loader = true
                          this.StaffSalaryReports = data;
                          this.ID1 = [];
                          this.loader = false
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
                  this.loader = false
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
          this.uniquelist.forEach((val: { checked: boolean; }) => { val.checked = false });
        }
        else {
          this.ID1 = [];
          debugger
          this.uniquelist.forEach((val: { checked: boolean; }) => { val.checked = true });
          this.IntID = true;
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
                    this.DigiofficeService.Get_PreliminaryReport(this.ID1[i], this.LOPDays, this.startdate, this.enddate)
                      .subscribe({
                        next: data => {
                          debugger
                          this.StaffSalaryReports = data;
                          this.ID1 = [];
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
    }
    this.viewpreliminary();
  }

  public getCheckbocdetails(evn: any) {
    debugger
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

  public SinglePreliminary(name: any, id: any) {
    this.seleconebtn = true;
    this.empid = id
    this.name = name
    this.loader = true;
    for (let i = 0; i < this.ID.length; i++) {
      debugger;
      this.EmployeeID = this.ID[i];
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
                      Array.prototype.push.apply(this.StaffSalaryReports1, this.StaffSalaryReports);
                      const key = 'empid';
                      this.uniquelist234 = [...new Map(this.StaffSalaryReports1.map((item: { [x: string]: any; }) =>
                        [item[key], item])).values()];
                      this.totalamount = 0;
                      for (let i = 0; i < this.uniquelist234.length; i++) {
                        this.totalamount += parseFloat(this.uniquelist234[i].netMonthSalary);
                      }
                      this.loader = false;
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
                                this.loader = false;
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
                                  this.loader = false;
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
                                this.loader = false;
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
    }
  }

  public SelectAllPreliminary() {
    debugger
    this.selecallbtn = true;
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
                          .subscribe(
                            res => {
                              debugger;
                              this.StaffSalaryReports = res;
                              this.ID1 = [];
                              location.href = '#/PayRoll'
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

  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('downloadaplication');
    debugger
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    debugger
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
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
    this.SelectAll();
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

  public getRoleType(event: any) {
    debugger
    this.RoleType = event.target.value;
  }

  public FilterRoleType() {
    debugger
    debugger
    this.DigiofficeService.Get_Employees_For_Payroll(this.startdate, this.enddate)
      .subscribe({
        next: data => {
          debugger
          this.stafflist = data.filter(x => x.daysworked > 0);
          const key = 'id';
          const key1 = 'month'
          this.uniquelist2 = [...new Map(this.stafflist.map((item: { [x: string]: any; }) =>
            [(item[key]), item])).values()]
          this.uniquelist = this.uniquelist2.filter((x: { role: any; }) => x.role == this.RoleType);
          this.count = this.uniquelist.length;
          this.uniquelistcopy = this.uniquelist;
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

  public filterByDepartment() {
    debugger
    this.DigiofficeService.Get_Employees_For_Payroll(this.startdate, this.enddate)
      .subscribe({
        next: data => {
          debugger
          this.stafflist = data.filter(x => x.daysworked > 0);
          const key = 'id';
          const key1 = 'month'
          this.uniquelist2 = [...new Map(this.stafflist.map((item: { [x: string]: any; }) =>
            [(item[key]), item])).values()]
          this.uniquelist = this.uniquelist2.filter((x: { department_name: any; }) => x.department_name == this.Department);
          this.count = this.uniquelist.length;
          this.uniquelistcopy = this.uniquelist;
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