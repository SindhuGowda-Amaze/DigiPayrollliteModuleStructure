import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-ytdreport-adjustment',
  templateUrl: './ytdreport-adjustment.component.html',
  styleUrls: ['./ytdreport-adjustment.component.css']
})
export class YTDReportAdjustmentComponent implements OnInit {
  currentUrl: any;
  loader: any;
  result: any;
  Departmentlist: any;
  RoleTypeList: any;
  p: any = 1;
  count1: any = 10;
  stafflist: any;
  uniquelist1: any;
  stafflist1: any;
  results: any;
  stafflist2: any;
  uniquelist13: any;
  showtable: any;
  RoleType: any;
  term: any;
  Department: any;
  year: any;

  constructor(private DigipayrollServiceService: DigipayrollserviceService) { }

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.year = "";
    this.DigipayrollServiceService.GetDepartment()
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
          this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })


    this.DigipayrollServiceService.GetRoleType()
      .subscribe({
        next: data => {
          debugger
          this.RoleTypeList = data;
        }, error: (err) => {
          Swal.fire('Issue in GettingRoleType');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })




    this.GetPayGroup();
  }

  public GetPayGroup() {
    debugger
    this.DigipayrollServiceService.GetPayGroup()
      .subscribe({
        next: data => {
          debugger
          this.result = data;
        }, error: (err) => {
          Swal.fire('Issue in Getting PayGroup');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })





  }



  public getemployee() {


    this.DigipayrollServiceService.GetEmployeeSalaryMonthly()
      .subscribe({
        next: data => {
          debugger
          this.stafflist = data.filter(x => x.emplyeeYear == this.year && (x.loanpayout != 0 || x.loanpayout != null));
        }, error: (err) => {
          Swal.fire('Issue in Getting EmployeeSalaryMonthly');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })




    const key = 'id'
    this.DigipayrollServiceService.GetEmployeeLoans()
      .subscribe({
        next: data => {
          debugger
          this.stafflist2 = data.filter(x => x.loanType != null);


          this.results = this.stafflist2.map((val: { staffID: any; }) => {
            return Object.assign({}, val, this.stafflist.filter((v: { monthstaffid: any; }) => v.monthstaffid === val.staffID)[0]);

          })

          const key = 'monthstaffid'

          this.uniquelist13 = [...new Map(this.results.map((item: { [x: string]: any; }) =>
            [(item[key]), item])).values()]

          this.showtable = 1
        }, error: (err) => {
          Swal.fire('Issue in Getting EmployeeLoans');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })









  }



  public FilterRoleType() {
    debugger

    this.DigipayrollServiceService.GetEmployeeSalaryMonthly()
      .subscribe({
        next: data => {
          debugger
          this.stafflist = data.filter(x => x.emplyeeYear == this.year && (x.loanpayout != 0 || x.loanpayout != null) && x.role == this.RoleType);
        }, error: (err) => {
          Swal.fire('Issue in Getting EmployeeSalaryMonthly');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })


    const key = 'id'
    this.DigipayrollServiceService.GetEmployeeLoans()
      .subscribe({
        next: data => {
          debugger
          this.stafflist2 = data.filter(x => x.loanType != null);


          this.results = this.stafflist2.map((val: { staffID: any; }) => {
            return Object.assign({}, val, this.stafflist.filter((v: { monthstaffid: any; }) => v.monthstaffid === val.staffID)[0]);

          })

          const key = 'monthstaffid'

          this.uniquelist13 = [...new Map(this.results.map((item: { [x: string]: any; }) =>
            [(item[key]), item])).values()]

          this.showtable = 1

          this.uniquelist13 = this.uniquelist13.filter((x: { role: any; }) => x.role == this.RoleType)

        }, error: (err) => {
          Swal.fire('Issue in Getting City Type');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })






  }

  public filterByDepartment() {
    debugger

    this.DigipayrollServiceService.GetEmployeeSalaryMonthly()
      .subscribe({
        next: data => {
          debugger
          this.stafflist = data.filter(x => x.emplyeeYear == this.year && (x.loanpayout != 0 || x.loanpayout != null));
        }, error: (err) => {
          Swal.fire('Issue in Getting EmployeeSalaryMonthly');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })






    const key = 'id'
    this.DigipayrollServiceService.GetEmployeeLoans()
      .subscribe({
        next: data => {
          debugger
          this.stafflist2 = data.filter(x => x.loanType != null);


          this.results = this.stafflist2.map((val: { staffID: any; }) => {
            return Object.assign({}, val, this.stafflist.filter((v: { monthstaffid: any; }) => v.monthstaffid === val.staffID)[0]);

          })

          const key = 'monthstaffid'

          this.uniquelist13 = [...new Map(this.results.map((item: { [x: string]: any; }) =>
            [(item[key]), item])).values()]


          this.uniquelist13 = this.uniquelist13.filter((x: { department_name: any; }) => x.department_name == this.Department)
          this.showtable = 1

        }, error: (err) => {
          Swal.fire('Issue in Getting City Type');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })







  }




  fileName = 'YTD Adjustment Report.xlsx';
  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('downloadaplication');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }

}