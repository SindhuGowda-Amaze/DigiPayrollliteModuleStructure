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
  selector: 'app-overtime-summary-report',
  templateUrl: './overtime-summary-report.component.html',
  styleUrls: ['./overtime-summary-report.component.css']
})
export class OvertimeSummaryReportComponent implements OnInit {

  constructor(public DigiofficeService: DigipayrollserviceService, public router: Router) { }
timedetails:any;
Departmentlist:any;
RoleTypeList:any;
p: any = 1;
timedetails1: any = [];
  ngOnInit(): void {
    this.RoleType = "";
    this.Department="";
    this.GetMyOverTimeDetails();
 
    this.DigiofficeService.GetDepartment().subscribe(data => {
      debugger
      this.Departmentlist = data;
    });

    this.DigiofficeService.GetRoleType().subscribe(data => {
      debugger
      this.RoleTypeList = data;
    });
     

  }
  uniquelist:any;
  count1:any;
  term:any;
  public GetMyOverTimeDetails() {
    debugger
    this.DigiofficeService.GetEmployeeSalary().subscribe(data => {
      debugger
      this.timedetails = data.filter(x=>x.otHours!=0);
      const key = 'startdate';

      this.uniquelist = [...new Map(this.timedetails.map((item: { [x: string]: any; }) =>
        [item[key], item])).values()];
      //  this.uniquelist = [...new Set(data.map(item => item))];

    });
   
  }
  month:any;
  year:any;
  payrolltype:any;
  public getemployeelist(month:any,year:any,payrolltype:any){
    this.month=month;
    this.year= year;
    this.payrolltype = payrolltype;
    this.DigiofficeService.GetEmployeeSalary().subscribe(data => {
      debugger
      this.timedetails = data.filter(x=>x.month==month && x.startyear==year && x.payrolltype==payrolltype && x.otHours!=0 );
    })
  }

  showleaseforprint:any;
  // timedetails1:any;
  id:any;
  selectedid:any;
  public getpayslip(id:any,startdate:any,enddate:any, event:any ,item:any){

    
    this.showleaseforprint=1;
    this.DigiofficeService.GetEmployeeSalary().subscribe(data => {
      debugger
   

    if (event.target.checked == true) {

      this.id = id;
    // this.selectedid.push(id);
     let temp = data.filter(x=>x.id==id && x.startdate==startdate && x.enddate==enddate);
    Array.prototype.push.apply(this.timedetails1, temp);

    }

    else if (event.target.checked == false) {
      this.timedetails1.splice(this.timedetails1.indexOf(item), 1);
    }
  })
  }


  RoleType:any;
 
public FilterRoleType() {
  debugger
  this.DigiofficeService.GetEmployeeSalary().subscribe(data => {
    debugger
    this.timedetails = data.filter(x=>x.month==this.month && x.year==this.year && x.role==this.RoleType);
  })
 
   
  

}
Department:any;

public filterByDepartment() {
  debugger
  this.DigiofficeService.GetEmployeeSalary().subscribe(data => {
    debugger
    this.timedetails = data.filter(x=>x.month==this.month && x.year==this.year && x.department_name==this.Department);
  })
  
  

  

}

playslipid: any
    selecallbtn: any;
    selectALL(event: any) { // pass true or false to check or uncheck all
      
      this.selecallbtn = true;
      this.playslipid = true;
      if (this.timedetails.every((val: { checked: boolean; }) => val.checked == true)) {
        this.timedetails.forEach((val: { checked: boolean; }) => { val.checked = false });
  
      }
      else {
        debugger
        this.timedetails.forEach((val: { checked: boolean; }) => { val.checked = true });
  
      }
  
  
  
      this.DigiofficeService.GetEmployeeSalary().subscribe(data => {
        debugger
        this.showleaseforprint = 1;
        
        this.timedetails1 = data.filter(x=>x.month==this.month && x.payrolltype==this.payrolltype && x.otHours!=0 );
      }
      )
  
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