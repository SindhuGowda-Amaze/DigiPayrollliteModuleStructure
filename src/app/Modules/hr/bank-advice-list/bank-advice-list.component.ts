import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bank-advice-list',
  templateUrl: './bank-advice-list.component.html',
  styleUrls: ['./bank-advice-list.component.css']
})
export class BankAdviceListComponent implements OnInit {

  viewMode = 'tab1';
  constructor(public DigiofficeService: DigipayrollserviceService, public router: Router) { }
  employeelist: any;
  uniquelist: any;
  year: any;
  Month: any;
  result:any;
  PayrollType: any;
  loader:any;
  ComputationBasic:any;
  ComputationDeminimis:any;
  ngOnInit(): void {
    this.year = "0";
    this.Month = "0";
    this.PayrollType = "0";
     this.loader=false
    this.DigiofficeService.GetCompany_PayrollComputation().subscribe(
      data => {
        debugger
    this.result = data;
		
    this.ComputationBasic =this.result[0].computationBasic ,
    this.ComputationDeminimis =this.result[0].computationDeminimis 

		
      }
    )

  }


  public Getyear(event:any){
debugger
this.year=event.target.value;
  }

 public Getmonth(event:any){
  debugger
  this.Month=event.target.value;
 }

 public Getpayrolltype(event:any){
  debugger
  this.PayrollType=event.target.value;
 }
  selectrun:any;
  thirteenthrunpayroll2:any;
  public runpayroll(){
    this.selectrun=1
     this.thirteenthrunpayroll2=0
  }

  public thirteenthrunpayroll(){
    this.thirteenthrunpayroll2=1
    this.selectrun=0
  }


  public getbankadvicelist() {
 debugger;
    if (this.year == " " || this.Month == " " || this.PayrollType == " " || this.year == undefined|| this.Month == undefined || this.PayrollType == undefined ) {
      Swal.fire('Please Select Year , Month and Pay Period')
    }
    else {
      this.loader=true
      var ele = document.getElementById('payroll11');
      if (ele != null) {
        ele.click();
      }
      this.DigiofficeService.GetEmployeeSalary().subscribe(data => {
        debugger
        this.employeelist = data.filter(x => x.startyear == this.year && x.month == this.Month && x.payrolltype == this.PayrollType);
        const key = 'startdate';

        this.uniquelist = [...new Map(this.employeelist.map((item: { [x: string]: any; }) =>
          [item[key], item])).values()];
        //  this.uniquelist = [...new Set(data.map(item => item))];
        this.loader=false
      });
    }

  }


  
  public getthirteenthbankadvicelist() {
    debugger;
       if (this.year == " " || this.year == undefined ) {
         Swal.fire('Please Select Year ')
       }
       else {
         
         this.DigiofficeService.GetThirteenthMonthSalary().subscribe(data => {
           debugger
           this.employeelist = data.filter(x => x.year == this.year);
           const key = 'staffID';
   
           this.uniquelist = [...new Map(this.employeelist.map((item: { [x: string]: any; }) =>
             [item[key], item])).values()];

             
           var ele = document.getElementById('payroll13');
           if (ele != null && this.uniquelist.length!=0) {
            ele.click();
          }
           //  this.uniquelist = [...new Set(data.map(item => item))];
   

         });
       }
   
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


  
  fileName = 'Bank Advice List.xlsx';
exportexcel1(): void {
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



exportexcel(): void {
  /* table id is passed over here */
  let element = document.getElementById('downloadaplication13');
  debugger
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
  debugger

  /* generate workbook and add the worksheet */
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  /* save to file */
  XLSX.writeFile(wb, this.fileName);

}


}