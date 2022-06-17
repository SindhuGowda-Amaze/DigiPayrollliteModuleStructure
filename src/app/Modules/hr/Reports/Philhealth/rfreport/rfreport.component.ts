import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rfreport',
  templateUrl: './rfreport.component.html',
  styleUrls: ['./rfreport.component.css'],
})
export class RFReportComponent implements OnInit {
  viewMode = 'tab1';
  stafflist: any;
  term: any;
  value: any;
  employeelist: any;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  minDate = new Date();
  year: any;
  month: any;
  loader: any;
  p: any = 1;
  count1: any = 10;
  uniquelist: any;
  currentUrl: any;

  constructor(
    public DigipayrollserviceService: DigipayrollserviceService,
    public router: Router
  ) {
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.month = '';
    this.year = '';
    this.GetMyDetails();
    this.GetEmployeeSalary();
  }
  public GetMyDetails() {
    debugger;
    this.DigipayrollserviceService.GetMyDetails()
    .subscribe({
      next: (data) => {
        debugger;
        this.stafflist = data.filter((x) => x.deniminimis != null);
      },
      error: (err) => {
        Swal.fire('Issue in GetMyDetails');
        // Insert error in Db Here//
        var obj = {
          PageName: this.currentUrl,
          ErrorMessage: err.error.message,
        };
        this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
          (data) => {
            debugger;
          }
        );
      },
    });
  }

  public GetEmployeeSalary() {
    this.DigipayrollserviceService.GetEmployeeSalary()
    .subscribe({
      next: (data) => {
        debugger;
        this.employeelist = data;
      },
      error: (err) => {
        Swal.fire('Issue in GetEmployeeSalary');
        // Insert error in Db Here//
        var obj = {
          PageName: this.currentUrl,
          ErrorMessage: err.error.message,
        };
        this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
          (data) => {
            debugger;
          }
        );
      },
    });
  }

  public showpdf() {
    this.loader = true;
    this.DigipayrollserviceService.GetEmployeeSalaryMonthly()
    .subscribe({
      next: (data) => {
        debugger;
        this.employeelist = data.filter(
          (x) =>
            x.employeeMonth == this.month && String(x.emplyeeYear) == this.year
        );
        const key = 'monthstaffid';

        this.uniquelist = [
          ...new Map(
            this.employeelist.map((item: { [x: string]: any }) => [
              item[key],
              item,
            ])
          ).values(),
        ];
        this.loader = false;
      },
      error: (err) => {
        Swal.fire('Issue in Deleting Hoilday');
        // Insert error in Db Here//
        var obj = {
          PageName: this.currentUrl,
          ErrorMessage: err.error.message,
        };
        this.DigipayrollserviceService.InsertExceptionLogs(obj).subscribe(
          (data) => {
            debugger;
          }
        );
      },
    });
  }

  fileName = 'RF-1 Data Report.xlsx';
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
