import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { interval } from 'rxjs';

@Component({
  selector: 'app-general-ledger-report',
  templateUrl: './general-ledger-report.component.html',
  styleUrls: ['./general-ledger-report.component.css']
})
export class GeneralLedgerReportComponent implements OnInit {
  timedetails:any;
  p: any = 1;
  showleaseforprint:any;
  timedetails1:any;
  uniquelist:any;
  count1:any;
  currentUrl: any;


  constructor(public DigiofficeService: DigipayrollserviceService, public router: Router) { }

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.GetMyOverTimeDetails();
 
  }
  
  public GetMyOverTimeDetails() {
    debugger
    this.DigiofficeService.GetEmployeeSalary()


    .subscribe({
      next: data => {
        debugger
        this.timedetails = data;
        const key = 'startdate';
  
        this.uniquelist = [...new Map(this.timedetails.map((item: { [x: string]: any; }) =>
          [item[key], item])).values()];
        //  this.uniquelist = [...new Set(data.map(item => item))];
      }, error: (err) => {
        Swal.fire('Issue in Getting EmployeeSalary');
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


  public getemployeelist(month:any,year:any,payrolltype:any){
    this.DigiofficeService.GetEmployeeSalary()
 
    .subscribe({
      next: data => {
        debugger
        this.timedetails = data.filter(x=>x.month==month && x.year==year && x.payrolltype==payrolltype);
      }, error: (err) => {
        Swal.fire('Issue in Getting EmployeeSalary');
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


  public getpayslip(month:any,startdate:any,enddate:any){
    this.showleaseforprint=1;
    this.DigiofficeService.GetEmployeeSalary()

    .subscribe({
      next: data => {
        debugger
        this.timedetails1 = data.filter(x=>x.id==month && x.startdate==startdate && x.enddate==enddate);
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


  fileName = 'Payroll Summery Reports.xlsx';
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
      doc.save('Payslip.pdf');

      var pdf1 = doc.output('blob');
      var file = new File([pdf1], "Application.pdf");
      let body = new FormData();
      debugger
      body.append('Dan', file);
      console.log('pdf', pdf1)



    }).then(() => {

    });;
  }

}