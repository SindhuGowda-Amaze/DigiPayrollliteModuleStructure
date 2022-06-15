import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { interval } from 'rxjs';

@Component({
  selector: 'app-preliminary-report',
  templateUrl: './preliminary-report.component.html',
  styleUrls: ['./preliminary-report.component.css']
})
export class PreliminaryReportComponent implements OnInit {

  viewMode = 'tab1';

  constructor(public DigiofficeService: DigipayrollserviceService, public router: Router, private datePipe: DatePipe) {
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

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

  ngOnInit(): void {
    this.Department = "";
    this.RoleType = "";
    debugger
    this.DigiofficeService.GetDepartment().subscribe(data => {
      debugger
      this.Departmentlist = data;
    });

    this.DigiofficeService.GetRoleType().subscribe(data => {
      debugger
      this.RoleTypeList = data;
    });





  }
  enddate: any;
  public getdate(event: any) {
    debugger
    this.enddate = event.target.value;

  }



  uniquelist: any;
  Search: any;
  public getemployeedetails() {

    if (this.startdate == undefined || this.enddate == undefined) {
      Swal.fire('Please Select Start Date and End Date')
    }
    else {
      this.loader = true
      this.DigiofficeService.Get_Employees_For_Payroll(this.startdate, this.enddate).subscribe(data => {
        debugger
        this.stafflist = data.filter(x => x.daysworked > 0);

        const key = 'id';
        const key1 = 'month'

        this.uniquelist = [...new Map(this.stafflist.map((item: { [x: string]: any; }) =>
          [(item[key]), item])).values()]
        this.count = this.uniquelist.length;
        this.uniquelistcopy = this.uniquelist;
        this.loader = false
        //  this.uniquelist = [...new Set(data.map(item => item))];



      });
    }

  }

  public filterPreliminary() {
    debugger
    let searchCopy = this.Search.toLowerCase();
    this.uniquelist = this.uniquelistcopy.filter((x: { name: string }) => (x.name.toLowerCase().includes(searchCopy)));
    this.count = this.uniquelist.length;
  }

  totalamount:any;
  public viewpreliminary() {
    this.loader = true;
    this.DigiofficeService.GetPreliminarySalary().subscribe(data => {
      debugger
      this.payrollList = data.filter(x => x.startdate1 == this.startdate && x.enddate1 == this.enddate);
      const key = "staffID"
      this.getnewlist(key);


      this.alluniquelist = [...new Map(this.payrollList.map((item: { [x: string]: any; }) =>
      [(item[key]), item])).values()]

      this.totalamount = 0;
      for (let i = 0; i < this.alluniquelist.length; i++) {
        this.totalamount += this.alluniquelist[i].netMonthSalary;
      }


    });




  }
  alluniquelist1: any
  public getnewlist(key: any) {
    debugger


    this.alluniquelist1 = Object.entries(this.alluniquelist)
    // this.alluniquelist1 = [...new Map(this.payrollList.map((item: { [x: string]: any; }) =>
    //   [(item[key]), item])).values()]
    this.loader = false;
  }

  ID1: any = [];
  loader: any;
  LOPDays: any;
  NoOfDays: any;
  alluniquelist: any = [];




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
            //this.EmployeeID =
            this.ID1[i];
            this.DigiofficeService.GetStaffLeavesForPayrollByDate(this.startdate, this.enddate, this.ID1[i]).subscribe(
              res => {
                debugger;
                if (res.length == 0) {
                  this.LOPDays = 0;
                  this.DigiofficeService.Get_PreliminaryReport(this.ID1[i], this.LOPDays, this.startdate, this.enddate).subscribe(
                    res => {

                      debugger;
                      this.StaffSalaryReports = res;
                      this.ID1 = [];


                      // location.href = '#/PayRoll'
                    }
                  )

                } else {
                  this.LOPDays = res[0].noOfDays;
                  if (this.LOPDays <= 2) {
                    this.LOPDays = this.LOPDays;
                  }
                  else {
                    this.LOPDays = this.LOPDays - 2;
                  }
                  this.DigiofficeService.Get_PreliminaryReport(this.ID1[i], this.LOPDays, this.startdate, this.enddate).subscribe(
                    res => {
                      debugger;
                      this.loader = true
                      this.StaffSalaryReports = res;
                      this.ID1 = [];
                      this.loader = false

                      // location.href = '#/PayRoll'
                    }
                  )
                }
                this.loader = false
              }


            )

          }



          // for (let i = 0; i < this.ID1.length; i++) {
          //   debugger;

          // }

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
            //this.EmployeeID =
            this.ID1[i];
            this.DigiofficeService.GetStaffLeavesForPayrollByDate(this.startdate, this.enddate, this.ID1[i]).subscribe(
              res => {

                debugger;
                if (res.length == 0) {
                  this.LOPDays = 0;
                  this.DigiofficeService.Get_PreliminaryReport(this.ID1[i], this.LOPDays, this.startdate, this.enddate).subscribe(
                    res => {
                      debugger;
                      this.StaffSalaryReports = res;
                      this.ID1 = [];


                      // location.href = '#/PayRoll'
                    }
                  )

                } else {
                  this.LOPDays = res[0].noOfDays;
                  if (this.LOPDays <= 2) {
                    this.LOPDays = this.LOPDays;
                  }
                  else {
                    this.LOPDays = this.LOPDays - 2;
                  }
                  this.DigiofficeService.Get_PreliminaryReport(this.ID1[i], this.LOPDays, this.startdate, this.enddate).subscribe(
                    res => {

                      debugger;
                      this.StaffSalaryReports = res;
                      this.ID1 = [];


                      // location.href = '#/PayRoll'
                    }
                  )
                }

              }


            )

          }


          // for (let i = 0; i < this.ID1.length; i++) {
          //   debugger;

          // }

        }

      }


    }




this.viewpreliminary();




  }



  EmployeeID: any
  temp: any;
  IntID: any
  PrevLOPDays: any;
  StaffSalaryReports: any;
  public ID: any = [];


  // public getCheckbocdetails(evn: any) {
  //   debugger
  //   let temp: any = evn;
  //   this.temp = Object.entries(temp);
  //   debugger
  //   if (this.temp.every((val: { checked: boolean; }) => val.checked == true)) {
  //     this.IntID = false;
  //     this.ID = [];
  //     this.temp.forEach((val: { checked: boolean; }) => { val.checked = false });
  //     this.IntID = false;
  //   }
  //   else {
  //     debugger;

  //     //  this.ID = [];
  //     debugger
  //     this.temp.forEach((val: { checked: boolean; }) => { val.checked = true });
  //     this.IntID = true;
  //     this.ID.push(evn.id);


  //       debugger;
  //       this.EmployeeID = this.ID[0];
  //       this.DigiofficeService.GetStaffLeavesForPayrollByDate(this.startdate, this.enddate, this.ID[0]).subscribe(
  //         res => {
  //           debugger;
  //           if (res.length == 0) {
  //             this.LOPDays = 0;
  //             this.DigiofficeService.Get_Salary_Splits(this.ID[0], this.LOPDays, this.startdate, this.enddate).subscribe(
  //               res => {
  //                 debugger;
  //                 this.StaffSalaryReports = res;
  //                    this.getempdetails(evn)
  //                 Swal.fire("Payroll Processing Completed");
  //                 this.Payrollvis = true
  //               }
  //             )

  //           } else {

  //             this.LOPDays = res[0].noOfDays;
  //             this.DigiofficeService.GetStaffLeavesForPayrollByDate(this.startdate, this.enddate, this.ID1[0]).subscribe(
  //               res1 => {
  //                 debugger;
  //                 this.PrevLOPDays = res1[0].noOfDays;
  //                 if (this.LOPDays > 2) {
  //                   if (this.PrevLOPDays == 0) {
  //                     this.LOPDays = this.LOPDays;
  //                     this.DigiofficeService.Get_Salary_Splits(this.ID[0], this.LOPDays, this.startdate, this.enddate).subscribe(
  //                       res => {
  //                         debugger;
  //                         this.StaffSalaryReports = res;
  //                         this.getempdetails(evn)
  //                         Swal.fire("Payroll Processing Completed");

  //                         this.ID = [];
  //                         this.Payrollvis = true;
  //                       }
  //                     )
  //                   }
  //                   else if (this.PrevLOPDays != 0) {
  //                     let ActualLOPDays = Number(this.LOPDays) + Number(this.PrevLOPDays);
  //                     if (ActualLOPDays > 4) {
  //                       this.LOPDays = Number(ActualLOPDays) - 4;
  //                       this.DigiofficeService.Get_Salary_Splits(this.ID[0], this.LOPDays, this.startdate, this.enddate).subscribe(
  //                         res => {
  //                           debugger;
  //                           this.StaffSalaryReports = res;
  //                              this.getempdetails(evn)
  //                           Swal.fire("Payroll Processing Completed");
  //                           this.ID = [];
  //                           this.Payrollvis = true;
  //                         }
  //                       )
  //                     }
  //                   }
  //                 }

  //                 else {
  //                   if (this.LOPDays <= 2 || this.PrevLOPDays == 0) {
  //                     this.LOPDays = 0;
  //                     this.DigiofficeService.Get_Salary_Splits(this.ID[0], this.LOPDays, this.startdate, this.enddate).subscribe(
  //                       res => {
  //                         debugger;
  //                         this.StaffSalaryReports = res;
  //                         this.getempdetails(evn)
  //                         Swal.fire("Payroll Processing Completed");
  //                         this.ID = [];
  //                         this.Payrollvis = true
  //                       }
  //                     )
  //                   }
  //                 }

  //               }
  //             )

  //           }

  //         }

  //       )


  //   }

  // }

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

      //  this.ID = [];
      debugger
      this.temp.forEach((val: { checked: boolean; }) => { val.checked = true });
      this.IntID = true;
      this.ID.push(evn.id);



    }


  }




  empid: any;
  name: any;
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
        this.DigiofficeService.GetStaffLeavesForPayrollByDate(this.startdate, this.enddate, this.ID[i]).subscribe(
          res => {
            debugger;
            if (res.length == 0) {
              this.LOPDays = 0;
              this.DigiofficeService.Get_PreliminaryReport(this.ID[i], this.LOPDays, this.startdate, this.enddate).subscribe(
                res => {
                  debugger;
                  this.StaffSalaryReports = res;
                  this.loader = false;

                  this.Showpayroll = 1
                  this.Payrollvis = true

                }
              )

            } else {

              this.LOPDays = res[0].noOfDays;
              this.DigiofficeService.GetStaffLeavesForPayrollByDate(this.startdate, this.enddate, this.ID[i]).subscribe(
                res1 => {
                  debugger;
                  this.PrevLOPDays = res1[0].noOfDays;
                  if (this.LOPDays > 2) {
                    if (this.PrevLOPDays == 0) {
                      this.LOPDays = this.LOPDays;
                      this.DigiofficeService.Get_PreliminaryReport(this.ID[i], this.LOPDays, this.startdate, this.enddate).subscribe(
                        res => {
                          debugger;
                          this.StaffSalaryReports = res;
                          this.loader = false;
                          this.Showpayroll = 1
                          this.ID = [];
                          this.Payrollvis = true;

                        }
                      )
                    }
                    else if (this.PrevLOPDays != 0) {
                      let ActualLOPDays = Number(this.LOPDays) + Number(this.PrevLOPDays);
                      if (ActualLOPDays > 4) {
                        this.LOPDays = Number(ActualLOPDays) - 4;
                        this.DigiofficeService.Get_PreliminaryReport(this.ID[i], this.LOPDays, this.startdate, this.enddate).subscribe(
                          res => {
                            debugger;
                            this.StaffSalaryReports = res;
                            this.loader = false;
                            this.Showpayroll = 1
                            this.ID = [];
                            this.Payrollvis = true;

                          }
                        )
                      }
                    }
                  }

                  else {
                    if (this.LOPDays <= 2 || this.PrevLOPDays == 0) {
                      this.LOPDays = 0;
                      this.DigiofficeService.Get_PreliminaryReport(this.ID[i], this.LOPDays, this.startdate, this.enddate).subscribe(
                        res => {
                          debugger;
                          this.StaffSalaryReports = res;
                          this.loader = false;
                          this.Showpayroll = 1
                          this.ID = [];
                          this.Payrollvis = true

                        }
                      )
                    }
                  }

                }
              )

            }

          }

        )
      }


      // Swal.fire({
      //   title: 'Are you sure?',
      //   text: 'To Run Payroll For This Period!',
      //   icon: 'warning',
      //   showCancelButton: true,
      //   confirmButtonText: 'Yes, Accept it!',
      //   cancelButtonText: 'No, keep it'
      // }).then((result) => {
      //   if (result.isConfirmed) {
      //     debugger
      //     for (let i = 0; i < this.ID.length; i++) {
      //       debugger;
      //       this.EmployeeID = this.ID[i];
      //       this.DigiofficeService.GetStaffLeavesForPayrollByDate(this.startdate, this.enddate, this.ID[i]).subscribe(
      //         res => {
      //           debugger;
      //           if (res.length == 0) {
      //             this.LOPDays = 0;
      //             this.DigiofficeService.Get_PreliminaryReport(this.ID[i], this.LOPDays, this.startdate, this.enddate).subscribe(
      //               res => {
      //                 debugger;
      //                 this.StaffSalaryReports = res;


      //                 this.Showpayroll=1
      //                 this.Payrollvis = true

      //               }
      //             )

      //           } else {

      //             this.LOPDays = res[0].noOfDays;
      //             this.DigiofficeService.GetStaffLeavesForPayrollByDate(this.startdate, this.enddate, this.ID[i]).subscribe(
      //               res1 => {
      //                 debugger;
      //                 this.PrevLOPDays = res1[0].noOfDays;
      //                 if (this.LOPDays > 2) {
      //                   if (this.PrevLOPDays == 0) {
      //                     this.LOPDays = this.LOPDays;
      //                     this.DigiofficeService.Get_PreliminaryReport(this.ID[i], this.LOPDays, this.startdate, this.enddate).subscribe(
      //                       res => {
      //                         debugger;
      //                         this.StaffSalaryReports = res;

      //                         this.Showpayroll=1
      //                         this.ID = [];
      //                         this.Payrollvis = true;

      //                       }
      //                     )
      //                   }
      //                   else if (this.PrevLOPDays != 0) {
      //                     let ActualLOPDays = Number(this.LOPDays) + Number(this.PrevLOPDays);
      //                     if (ActualLOPDays > 4) {
      //                       this.LOPDays = Number(ActualLOPDays) - 4;
      //                       this.DigiofficeService.Get_PreliminaryReport(this.ID[i], this.LOPDays, this.startdate, this.enddate).subscribe(
      //                         res => {
      //                           debugger;
      //                           this.StaffSalaryReports = res;

      //                           this.Showpayroll=1
      //                           this.ID = [];
      //                           this.Payrollvis = true;

      //                         }
      //                       )
      //                     }
      //                   }
      //                 }

      //                 else {
      //                   if (this.LOPDays <= 2 || this.PrevLOPDays == 0) {
      //                     this.LOPDays = 0;
      //                     this.DigiofficeService.Get_PreliminaryReport(this.ID[i], this.LOPDays, this.startdate, this.enddate).subscribe(
      //                       res => {
      //                         debugger;
      //                         this.StaffSalaryReports = res;

      //                         this.Showpayroll=1
      //                         this.ID = [];
      //                         this.Payrollvis = true

      //                       }
      //                     )
      //                   }
      //                 }

      //               }
      //             )

      //           }

      //         }

      //       )
      //     }






      //     // For more information about handling dismissals please visit
      //     // https://sweetalert2.github.io/#handling-dismissals
      //   } else if (result.dismiss === Swal.DismissReason.cancel) {
      //     Swal.fire(
      //       'Cancelled',
      //       'Your imaginary file is safe :)',
      //       'error'
      //     )
      //   }
      // })

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
                //this.EmployeeID =
                this.ID1[i];
                this.DigiofficeService.GetStaffLeavesForPayrollByDate(this.startdate, this.enddate, this.ID1[i]).subscribe(
                  res => {
                    debugger;
                    if (res.length == 0) {
                      this.LOPDays = 0;
                      this.DigiofficeService.Get_PreliminaryReport(this.ID1[i], this.LOPDays, this.startdate, this.enddate).subscribe(
                        res => {
                          debugger;
                          this.StaffSalaryReports = res;
                          this.ID1 = [];
                          location.href = '#/PayRoll'
                        }
                      )

                    } else {
                      this.LOPDays = res[0].noOfDays;
                      if (this.LOPDays <= 2) {
                        this.LOPDays = this.LOPDays;
                      }
                      else {
                        this.LOPDays = this.LOPDays - 2;
                      }
                      this.DigiofficeService.Get_PreliminaryReport(this.ID1[i], this.LOPDays, this.startdate, this.enddate).subscribe(
                        res => {
                          debugger;
                          this.StaffSalaryReports = res;
                          this.ID1 = [];
                          location.href = '#/PayRoll'
                        }
                      )
                    }

                  }


                )

              }


              // for (let i = 0; i < this.ID1.length; i++) {
              //   debugger;

              // }

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
                //this.EmployeeID =
                this.ID1[i];
                this.DigiofficeService.GetStaffLeavesForPayrollByDate(this.startdate, this.enddate, this.ID1[i]).subscribe(
                  res => {
                    debugger;
                    if (res.length == 0) {
                      this.LOPDays = 0;
                      this.DigiofficeService.Get_Salary_Splits(this.ID1[i], this.LOPDays, this.startdate, this.enddate).subscribe(
                        res => {
                          debugger;
                          this.StaffSalaryReports = res;
                          this.ID1 = [];
                          location.href = '#/PayRoll'
                        }
                      )

                    } else {
                      this.LOPDays = res[0].noOfDays;
                      if (this.LOPDays <= 2) {
                        this.LOPDays = this.LOPDays;
                      }
                      else {
                        this.LOPDays = this.LOPDays - 2;
                      }
                      this.DigiofficeService.Get_Salary_Splits(this.ID1[i], this.LOPDays, this.startdate, this.enddate).subscribe(
                        res => {
                          debugger;
                          this.StaffSalaryReports = res;
                          this.ID1 = [];
                          location.href = '#/PayRoll'
                        }
                      )
                    }

                  }
                )

              }


              // for (let i = 0; i < this.ID1.length; i++) {
              //   debugger;

              // }

            }

          }


        }
        else {

          Swal.fire('Range for Payroll either 15 days or 30 days')
        }
      }
    })
  }



  selecallbtn: any;
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
  public getpayslip(id: any) {
    this.DigiofficeService.GetPreliminarySalary().subscribe(data => {
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






    }
    )

  }


  public getRoleType(event: any) {
    debugger
    this.RoleType = event.target.value;
  }

  public FilterRoleType() {
    debugger
    debugger
    this.DigiofficeService.Get_Employees_For_Payroll(this.startdate, this.enddate).subscribe(data => {
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
      //  this.uniquelist = [...new Set(data.map(item => item))];



    });

    // this.DigiofficeService.GetMyDetails().subscribe(data => {
    //   debugger
    //   this.uniquelist = data.filter(x => x.roleType == this.RoleType);
    //   this.count = this.uniquelist.length;
    // });

  }
  uniquelist2:any;
  public filterByDepartment() {
    debugger
    this.DigiofficeService.Get_Employees_For_Payroll(this.startdate, this.enddate).subscribe(data => {
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
      //  this.uniquelist = [...new Set(data.map(item => item))];



    });

    // this.DigiofficeService.GetMyDetails().subscribe(data => {
    //   debugger
    //   this.uniquelist = data.filter(x => x.department == this.Department);
    //   this.count = this.uniquelist.length;
    // });

  }

}