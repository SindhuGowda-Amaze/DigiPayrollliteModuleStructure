import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-pay-roll-dash',
  templateUrl: './pay-roll-dash.component.html',
  styleUrls: ['./pay-roll-dash.component.css']
})
export class PayRollDashComponent implements OnInit {

  constructor(public DigiofficeService: DigipayrollserviceService, public router: Router) {
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  stafflist: any;
  term: any;
  value: any;
  Month: any;
  year: any;
  PayrollType: any;
  employeelist: any;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  minDate = new Date();
  employeelist1: any;
  uniquelist: any;
  Search: any;
  Duration: any;
  viewMode = 'tab1';
  public todaydate: any;
  public firstdayofcurrentyear: any;
  public firstdayofcurrentweek: any;
  public lastdayofcurrentweek: any;
  public firstdayofpreviousmonth: any;
  public lastdayofpreviousmonth: any;
  public firstdayofpreviousyear: any;
  public lastdayofpreviousyear: any;
  finalist: any;
  loader: any;
  firstDayofcurrentmonth: any;
  filtereddate1: any;
  employeelistCopy: any;
  thirteenthlist: any;
  result: any;
  ComputationBasic: any;
  p: any = 1;
  month: any;
  count1: any = 10;
  ComputationDeminimis: any;
  Departmentlist: any;
  currentUrl: any;

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.loader = true;
    this.Department = "";
    this.Duration = "";
    this.month = new Date().getMonth();
    this.selectrun = 1
    debugger
    this.GetDepartment();
    this.GetMyDetails();
    this.GetThirteenthMonthSalary();
    this.GetCompany_PayrollComputation();
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    var curr = new Date;
    this.filtereddate1 = formatDate(myDate, format, locale);
    this.todaydate = this.filtereddate1;
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    this.firstdayofcurrentweek = new Date(curr.setDate(first)).toUTCString();
    this.lastdayofcurrentweek = new Date(curr.setDate(last)).toUTCString();

    this.firstDayofcurrentmonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    this.firstDayofcurrentmonth = formatDate(this.firstDayofcurrentmonth, format, locale);


    this.firstdayofcurrentweek = formatDate(this.firstdayofcurrentweek, format, locale);
    this.lastdayofcurrentweek = formatDate(this.lastdayofcurrentweek, format, locale);
    this.GetEmployeeSalary();
    this.GetEmployeeSalary1();
    this.GetEmployeeFinalSalary();
  }

  public GetEmployeeFinalSalary(){
    this.DigiofficeService.GetEmployeeFinalSalary()
    .subscribe({
      next: data => {
        debugger
        this.finalist = data;
        this.loader=false;
      }, error: (err) => {
        Swal.fire('Issue in Getting Employee Final Salary');
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

  public GetEmployeeSalary1(){
    this.DigiofficeService.GetEmployeeSalary()
    .subscribe({
      next: data => {
        debugger
        this.employeelist1 = data.filter(x => x.resignationDate != null);
        this.loader=false;
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

  public GetEmployeeSalary(){
    this.DigiofficeService.GetEmployeeSalary()
    .subscribe({
      next: data => {
        debugger
        this.employeelist = data;
        this.employeelistCopy = this.employeelist;
        this.totalamount = 0;
        for (let i = 0; i < this.employeelist.length; i++) {
          this.totalamount += parseFloat(this.employeelist[i].netMonthSalary);
        }
        const key = 'startdate';
        const key1 = 'StaffID'
        this.uniquelist = [...new Map(this.employeelist.map((item: { [x: string]: any; }) =>
          [(item[key]), item])).values()]
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

  public GetCompany_PayrollComputation() {
    this.DigiofficeService.GetCompany_PayrollComputation()
    .subscribe({
      next: data => {
        debugger
        this.result = data;

        this.ComputationBasic = this.result[0].computationBasic,
          this.ComputationDeminimis = this.result[0].computationDeminimis
        this.loader=false;
      }, error: (err) => {
        Swal.fire('Issue in Getting Company Payroll Computation');
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

  public GetThirteenthMonthSalary() {
    this.DigiofficeService.GetThirteenthMonthSalary()
    .subscribe({
      next: data => {
        debugger
        this.thirteenthlist = data;
        this.loader=false;
      }, error: (err) => {
        Swal.fire('Issue in Getting Thirteenth Month Salary');
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

  public GetDepartment() {
    this.DigiofficeService.GetDepartment()
    .subscribe({
      next: data => {
        debugger
        this.Departmentlist = data;
        this.loader=false;
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

  public GetMyDetails() {
    this.DigiofficeService.GetMyDetails()
    .subscribe({
      next: data => {
        debugger
        this.stafflist = data.filter(x => x.deniminimis != null && x.resignationDate == null);
        this.loader=false;
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

  selectrun: any;
  finalpayroll: any;
  thirteenthrunpayroll2: any;

  public runpayroll() {
    this.selectrun = 1
    this.thirteenthrunpayroll2 = 0
    this.finalpayroll = 0
  }

  public thirteenthrunpayroll() {
    this.thirteenthrunpayroll2 = 1
    this.selectrun = 0
    this.finalpayroll = 0
  }

  public FinalPayroll() {
    this.thirteenthrunpayroll2 = 0
    this.selectrun = 0
    this.finalpayroll = 1
  }

  enddate: any;

  public getdate(event: any) {
    debugger
    this.enddate = event.target.value;
  }

  fileName = 'Payroll Report.xlsx';

  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('lvs');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  public filteremployee() {
    this.DigiofficeService.GetEmployeeSalary()
    .subscribe({
      next: data => {
        debugger
        this.employeelist = data.filter(x => x.month == this.Duration);

      this.totalamount = 0;

      for (let i = 0; i < this.employeelist.length; i++) {
        this.totalamount += parseFloat(this.employeelist[i].netMonthSalary)
      }
        this.loader=false;
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

  public Filterjobs() {
    debugger
    let searchCopy = this.Search.toLowerCase();
    // this.employeelist = this.employeelistCopy.filter((x: { jobRefernceID: string,jobTitle: string; }) => x.jobRefernceID.toString().includes(searchCopy)||x.jobTitle.toLowerCase().includes(searchCopy));
    this.employeelist = this.employeelistCopy.filter((x: { staffname: string, grossSalary: Number, netMonthSalary: Number }) =>
      x.staffname.toLowerCase().includes(searchCopy) ||
      x.grossSalary.toString().includes(searchCopy) ||
      x.netMonthSalary.toString().includes(searchCopy));
    this.totalamount = 0;

    for (let i = 0; i < this.employeelist.length; i++) {
      this.totalamount += parseFloat(this.employeelist[i].netMonthSalary);
    }
  }

  Department: any;

  public filterByDepartment() {
    debugger

    this.DigiofficeService.GetEmployeeSalary()
    .subscribe({
      next: data => {
        debugger
        this.employeelist = data.filter(x => x.department_name == this.Department);

        this.totalamount = 0;
  
        for (let i = 0; i < this.employeelist.length; i++) {
          this.totalamount += parseFloat(this.employeelist[i].netMonthSalary);
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

  public filterByDepartmentFinal() {
    debugger

    this.DigiofficeService.GetEmployeeFinalSalary()
    .subscribe({
      next: data => {
        debugger
        this.finalist = data.filter(x => x.department_name == this.Department);

        this.loader=false;
      }, error: (err) => {
        Swal.fire('Issue in Getting Employee Final Salary');
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

  ID1: any = [];
  startdate: any;
  LOPDays: any;
  NoOfDays: any

  public SelectAll() {
    debugger
    var date1 = new Date(this.startdate);
    var date2 = new Date(this.enddate);

    var Time = date2.getTime() - date1.getTime();
    let days: any = Time / (1000 * 3600 * 24);
    this.NoOfDays = days + 1;

    if (this.startdate == undefined || this.enddate == undefined) {
      Swal.fire('Please Select Start Date and End Date')
    }
    else if (this.startdate > this.enddate) {
      Swal.fire('End Date must be greater than start date');
    }
    else if (this.NoOfDays == 15 || this.NoOfDays == 30 || this.NoOfDays == 31 || this.NoOfDays == 28) {

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
                  this.DigiofficeService.Get_Salary_Splitsfor15days(this.ID1[i], this.LOPDays, this.startdate, this.enddate)
                  .subscribe({
                    next: data => {
                      debugger
                      this.StaffSalaryReports = data;
                      this.ID1 = [];
                      location.href = '#/Payrolldetails'
                      this.loader=false;
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
                      location.href = '#/Payrolldetails'
                      this.loader=false;
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
                this.loader=false;
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


          // for (let i = 0; i < this.ID1.length; i++) {
          //   debugger;

          // }

        }
        // this.DigiofficeService.DeleteEmployeeSalary(1).subscribe(res => {

        // })
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
                      location.href = '#/Payrolldetails'
                      this.loader=false;
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
                      location.href = '#/Payrolldetails'
                      this.loader=false;
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
                this.loader=false;
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


          // for (let i = 0; i < this.ID1.length; i++) {
          //   debugger;

          // }

        }
        // this.DigiofficeService.DeleteEmployeeSalary(1).subscribe(res => {

        // })
      }


    }
    else {

      Swal.fire('Range for Payroll either 15 days or 30 days')
    }



  }

  EmployeeID: any
  temp: any;
  IntID: any
  PrevLOPDays: any;
  StaffSalaryReports: any;
  public ID: any = [];
  totalamount: any;

  public getbankadvicelist() {
    this.DigiofficeService.GetEmployeeSalary()
    .subscribe({
      next: data => {
        debugger
        this.employeelist = data.filter(x => x.startyear == this.year && x.month == this.Month && x.payrolltype == this.PayrollType);
      const key = 'startdate';

      this.uniquelist = [...new Map(this.employeelist.map((item: { [x: string]: any; }) =>
        [item[key], item])).values()];

      this.totalamount = 0;

      for (let i = 0; i < this.uniquelist.length; i++) {
        this.totalamount += this.uniquelist[i].netSalary;
      }
        this.loader=false;
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




  public convetToPDF1() {
    debugger

    var data: any = document.getElementById('downloadaplication');
    html2canvas(data).then(canvas => {

      var margin = 5;
      var imgWidth = 208
      // var pageHeight = 295 - 10 * margin;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      var doc = new jsPDF('p', 'mm');
      var position = 0;
      while (heightLeft > 0) {

        const contentDataURL = canvas.toDataURL('image/png')
        position = heightLeft - imgHeight;

        doc.addPage();


        doc.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);

        heightLeft -= pageHeight;

      }
      doc.deletePage(1)
      doc.save('Bank Advice List.pdf');

      var pdf1 = doc.output('blob');
      var file = new File([pdf1], "Application.pdf");
      let body = new FormData();
      debugger
      body.append('Dan', file);
      console.log('pdf', pdf1)



    }).then(() => {

    });;
  }



  public currentmonth() {


    this.DigiofficeService.GetEmployeeSalary()
    .subscribe({
      next: data => {
        debugger
        this.employeelist = data.filter(x => x.month == this.month + 1);


        this.totalamount = 0;
  
        for (let i = 0; i < this.employeelist.length; i++) {
          this.totalamount += this.employeelist[i].netMonthSalary;
        }
        this.loader=false;
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