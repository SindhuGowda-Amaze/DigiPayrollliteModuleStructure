import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-monthly-report',
  templateUrl: './monthly-report.component.html',
  styleUrls: ['./monthly-report.component.css']
})
export class MonthlyReportComponent implements OnInit {

  result: any;
  showtable: any;
  Checked: any;
  loader: any;
  stafflist: any;
  paygroup: any;
  Tax_Table_Starts_on: any;
  uniquelist: any;
  stafflist1: any;
  daysInMonth: any;
  uniquelist1: any;
  Departmentlist: any;
  RoleTypeList: any;
  p: any = 1;
  count1: any = 10;

  currentUrl: any;
  uniquelis: any;
  employeelist13: any = [];
  employeelist: any;
  leavelist: any;
  BankAccountNumber: any;

  days: any;
  getDaysInMonth: any;


  month: any;
  year: any;
  basicday: any;
  basichour: any;
  monthname: any;
  playslipid: any
  selecallbtn: any;
  employeelist1: any;
  uniquelist13: any;
  showleaseforprint: any;


  constructor(private DigipayrollServiceService: DigipayrollserviceService) { }

  ngOnInit(): void {

    this.currentUrl = window.location.href;
    this.loader = true;
    var dt = new Date();



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
    
   


    this.GetPayGroup();
    this.DigipayrollServiceService.GetEmployeeSalaryMonthly()
    
    .subscribe(data => {
      debugger
      this.employeelist = data;
      const key = 'month';
      const key1 = 'endyear';

      this.uniquelist = [...new Map(this.employeelist.map((item: { [x: string]: any; }) =>
        [item[key], item])).values()];
      //  this.uniquelist = [...new Set(data.map(item => item))];
      this.stafflist1 = this.uniquelist.filter((x: { endyear: number; }) => x.endyear == 2022)
      this.loader = false;
    });



  }

  id: any
  public getCheckbocdetails(evn: any) {
    this.id = evn.id


  }

  public getempdetails(id: any, event: any, item: any) {


    this.DigipayrollServiceService.GetEmployeeSalaryMonthly()




      .subscribe({
        next: data => {
          debugger
          if (event.target.checked == true) {

            this.id = id;

            let temp: any = data.filter(x => x.id == this.id && x.monthstaffid == id);
            Array.prototype.push.apply(this.employeelist13, temp);

            const key = 'monthstaffid'

            this.uniquelis = [...new Map(this.employeelist13.map((item: { [x: string]: any; }) =>
              [(item[key]), item])).values()]

          }

          else if (event.target.checked == false) {
            this.uniquelis.splice(this.uniquelis.indexOf(item), 1);
          }
          this.showleaseforprint = 1
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



  public getMonthandyear(year: string, month: string,) {
    this.month = String(month),
      this.year = String(year)
    this.DigipayrollServiceService.GetEmployeeSalaryMonthly()


      .subscribe({
        next: data => {
          debugger
          this.stafflist = data.filter(x => x.month == month && x.endyear == year);

          const key = "monthstaffid"

          this.uniquelist1 = [...new Map(this.stafflist.map((item: { [x: string]: any; }) =>
            [(item[key]), item])).values()]

          this.monthname = this.uniquelist1[0].monthname
        }, error: (err) => {
          Swal.fire('Issue in Getting EmployeeSalaryMonthl');
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
  show2div: any;
  public Getrankandfile(eve: any, year: any, month: any) {
    debugger

    this.paygroup = eve.currentTarget.checked;
    if (this.paygroup == true) {
      this.show2div = true;
      this.getMonthandyear(year, month)
    } else {
      this.show2div = false;
    }


  }

  // public getmonthlyreport(id:any){
  //   this.DigipayrollServiceService.GetEmployeeSalary().subscribe(data => {
  //     debugger

  //     this.employeelist = data.filter(x=>x.id==id);
  //     this.month = this.employeelist[0].month
  //     this.year = this.employeelist[0].endyear
  //     this.daysInMonth = new Date(this.year, this.month, 0).getDate();
  //     this.basicday = (this.employeelist[0].grossSalary)/this.daysInMonth
  //     this.basichour = (this.employeelist[0].grossSalary)/8

  //   });
  //   this.DigipayrollServiceService.GetBankDetails().subscribe(
  //     data => {
  //       debugger

  //       this.leavelist = data.filter(x => x.staffId == id);

  //         this.BankAccountNumber = this.leavelist[0].bankAccountNumber

  //     },
  //   );
  // }

  uniquelist213: any;


  public getpaygrouplist() {
    this.DigipayrollServiceService.GetMyDetails()


      .subscribe({
        next: data => {
          debugger
          this.stafflist = data.filter(x => x.paygroup == this.paygroup && x.deniminimis != null);






          const key = 'id'

          this.uniquelist213 = [...new Map(this.stafflist.map((item: { [x: string]: any; }) =>
            [(item[key]), item])).values()]
        }, error: (err) => {
          Swal.fire('Issue in Getting MyDetails');
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

  fileName = 'Monthly Summary Report.xlsx';
  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('download');
    debugger
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    debugger

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }

  Showdata() {
    debugger
    this.showtable = 1;
  }

  showdata: any;
  Show1() {
    this.showdata = 1
  }



  selectALL(checked: boolean) { // pass true or false to check or uncheck all
    this.selecallbtn = true;
    this.playslipid = true;
    if (this.stafflist.every((val: { checked: boolean; }) => val.checked == true)) {
      this.stafflist.forEach((val: { checked: boolean; }) => { val.checked = false });

    }
    else {
      debugger
      this.stafflist.forEach((val: { checked: boolean; }) => { val.checked = true });

    }



    this.DigipayrollServiceService.GetEmployeeSalaryMonthly()


      .subscribe({
        next: data => {
          debugger
          this.employeelist = data.filter(x => x.month == this.month);



          const key = 'monthstaffid'

          this.uniquelist13 = [...new Map(this.employeelist.map((item: { [x: string]: any; }) =>
            [(item[key]), item])).values()]
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
    this.showtable = 1
    this.showleaseforprint = 1

  }


  RoleType: any;
  term: any;
  public FilterRoleType() {
    debugger
    this.DigipayrollServiceService.GetEmployeeSalaryMonthly()


      .subscribe({
        next: data => {
          debugger
          this.stafflist = data.filter(x => x.month == this.month && x.endyear == this.year && x.role == this.RoleType);

          const key = "monthstaffid"

          this.uniquelist1 = [...new Map(this.stafflist.map((item: { [x: string]: any; }) =>
            [(item[key]), item])).values()]

          this.monthname = this.uniquelist1[0].monthname
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


  }
  Department: any;

  public filterByDepartment() {
    debugger
    this.DigipayrollServiceService.GetEmployeeSalaryMonthly()

      .subscribe({
        next: data => {
          debugger
          this.stafflist = data.filter(x => x.month == this.month && x.endyear == this.year && x.department_name == this.Department);

          const key = "monthstaffid"

          this.uniquelist1 = [...new Map(this.stafflist.map((item: { [x: string]: any; }) =>
            [(item[key]), item])).values()]

          this.monthname = this.uniquelist1[0].monthname
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


  }



}