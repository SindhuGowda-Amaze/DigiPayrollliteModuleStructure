import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Component({
  selector: 'app-sssr3-report',
  templateUrl: './sssr3-report.component.html',
  styleUrls: ['./sssr3-report.component.css']
})
export class SSSR3ReportComponent implements OnInit {
  currentUrl: any;
  amount: any;
  employeelist: any;
  merged: any;
  results: any;
  uniquelist: any;
  sssnumber: any;
  staffid: any;
  Month: any;
  Year: any;
  loader: any;
  p: any = 1;
  count1: any = 10;
  govtattachment: any;
  govtlist: any;
  constructor(private DigipayrollServiceService: DigipayrollserviceService) { }
 
  ngOnInit(): void {

    this.currentUrl = window.location.href;
    this.Month = "";
    this.Year = "";
  }
  public GetNewGovernmentRecords() {
    debugger
    this.loader = true;
    this.DigipayrollServiceService.GetNewGovernmentRecords()
    .subscribe({
      next: data => {
        debugger
        this.govtlist = data.filter(x => String(x.year) == this.Year && String(x.month) == this.Month && x.sbrorNumber == this.sssnumber);


      this.staffid = this.govtlist[0].staffID
      this.DigipayrollServiceService.GetEmployeeSalaryMonthly()
      
      .subscribe({
        next: data => {
          debugger
          this.employeelist = data.filter(x => x.monthstaffid == this.staffid && x.month == this.Month);
  
          this.results = this.govtlist.map((val: { staffID: any; }) => {
            return Object.assign({}, val, this.employeelist.filter((v: { monthstaffid: any; }) => v.monthstaffid === val.staffID)[0]);
          });
  
          const key = 'id';
  
  
          this.uniquelist = [...new Map(this.employeelist.map((item: { [x: string]: any; }) =>
            [(item[key]), item])).values()]
  
  
            this.loader = false;
  
          console.log('data', this.results)
        }, error: (err) => {
          Swal.fire('Issue in GetEmployeeSalaryMonthly');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )}
      })
    
      }, error: (err) => {
        Swal.fire('Issue in Getting NewGovernmentRecords');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigipayrollServiceService.InsertExceptionLogs(obj)
        .subscribe({
          next: data => {
            debugger
            this.staffid = this.govtlist[0].staffID
            this.DigipayrollServiceService.GetEmployeeSalaryMonthly().subscribe(data => {
              debugger
              this.employeelist = data.filter(x => x.monthstaffid == this.staffid && x.month == this.Month);
      
              this.results = this.govtlist.map((val: { staffID: any; }) => {
                return Object.assign({}, val, this.employeelist.filter((v: { monthstaffid: any; }) => v.monthstaffid === val.staffID)[0]);
              });
      
              const key = 'id';
      
      
              this.uniquelist = [...new Map(this.employeelist.map((item: { [x: string]: any; }) =>
                [(item[key]), item])).values()]
      
      
                this.loader = false;
      
              console.log('data', this.results)
      
            });
          }, error: (err) => {
            Swal.fire('Issue in Getting InsertExceptionLogs');
            // Insert error in Db Here//
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message
            }
            this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
              () => {
                debugger
              },
            )
          }
        })
  
      }    
    })
  }
  fileName = 'R3 Report.xlsx';
  exportexcel(): void {
    this.loader = true;
    /* table id is passed over here */
    let element = document.getElementById('download');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
    this.loader = false;
  }



}