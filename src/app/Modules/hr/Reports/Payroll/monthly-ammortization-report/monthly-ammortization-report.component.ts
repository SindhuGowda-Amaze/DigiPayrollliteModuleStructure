import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-monthly-ammortization-report',
  templateUrl: './monthly-ammortization-report.component.html',
  styleUrls: ['./monthly-ammortization-report.component.css']
})
export class MonthlyAmmortizationReportComponent implements OnInit {

  showtable:any;
  constructor(public DigipayrollServiceService: DigipayrollserviceService) { }
  selecallbtn:any;
  stafflist:any;
  uniquelist1:any;
  term:any;
  selectone:any;
  Departmentlist:any;
  p: any = 1;
  RoleTypeList:any;
  count1: any = 10;
  ngOnInit(): void {
    this.selecallbtn = false;
    this.selectone = false;
    this.DigipayrollServiceService.GetDepartment().subscribe(data => {
      debugger
      this.Departmentlist = data;
    });

    this.DigipayrollServiceService.GetRoleType().subscribe(data => {
      debugger
      this.RoleTypeList = data;
    });
     
  this.DigipayrollServiceService.GetEmployeeSalary().subscribe(data => {
    debugger
    this.stafflist = data.filter(x=>x.loanpayout!=0)

    const key = 'id'
    
    this.uniquelist1  = [...new Map(this.stafflist.map((item: { [x: string]: any; }) =>
    [(item[key]), item])).values()]
  });
  }

 


public getallemployee(){
 
 
  this.DigipayrollServiceService.GetEmployeeLoans().subscribe(data => {
    debugger
    this.stafflist1 = data.filter(x => x.loanType!=null || x.loanType!=0 );

    const key = 'id'
    
    this.uniquelist2  = [...new Map(this.stafflist1.map((item: { [x: string]: any; }) =>
    [(item[key]), item])).values()]
  });

  this.selectone = true;;
}

RoleType:any;
public FilterRoleType() {
  debugger
  this.DigipayrollServiceService.GetEmployeeSalary().subscribe(data => {
    debugger
    this.stafflist = data.filter(x=>x.loanpayout!=0)

    const key = 'id'
    
    this.uniquelist1  = [...new Map(this.stafflist.map((item: { [x: string]: any; }) =>
    [(item[key]), item])).values()]


    this.uniquelist1 = this.uniquelist1.filter((x: { role: any; }) => x.role == this.RoleType);
    

  });
 
   
  

}
Department:any;
public filterByDepartment() {
  debugger
  this.DigipayrollServiceService.GetEmployeeSalary().subscribe(data => {
    debugger
    this.stafflist = data.filter(x=>x.loanpayout!=0)

    const key = 'id'
    
    this.uniquelist1  = [...new Map(this.stafflist.map((item: { [x: string]: any; }) =>
    [(item[key]), item])).values()]


    this.uniquelist1 = this.uniquelist1.filter((x: { department_name: any; }) => x.department_name == this.Department);
    

  });

  

}




  stafflist1:any;
  uniquelist2:any;
public getemployee(id:any){
 
 
  this.DigipayrollServiceService.GetEmployeeLoans().subscribe(data => {
    debugger
    this.stafflist1 = data.filter(x => x.staffID==id && x.loanType!=null );

    const key = 'id'
    
    this.uniquelist2  = [...new Map(this.stafflist1.map((item: { [x: string]: any; }) =>
    [(item[key]), item])).values()]
  });

  this.selectone = true;;
}


fileName = 'Adjustment Report.xlsx';
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


  Showdata(){
    debugger
      this.showtable=1;   
  }


  playslipid: any
  uniquelist13:any;
  employeelist1:any;
  results:any;
  showleaseforprint:any;
  stafflist13:any;
  selectALL(checked: boolean) { // pass true or false to check or uncheck all
    this.selecallbtn = true;
    this.playslipid = true;
    if (this.uniquelist1.every((val: { checked: boolean; }) => val.checked == true)) {
      this.uniquelist1.forEach((val: { checked: boolean; }) => { val.checked = false });

    }
    else {
      debugger
      this.uniquelist1.forEach((val: { checked: boolean; }) => { val.checked = true });

    }


 
 
    this.DigipayrollServiceService.GetEmployeeLoans().subscribe(data => {
      debugger
      this.stafflist1 = data.filter(x=>x.loanType!=null || x.loanType!=0);
  
     
      this.DigipayrollServiceService.GetEmployeeSalary().subscribe(data => {
        debugger
        this.stafflist13 = data.filter(x=>x.loanpayout!=0)
    

      this.results = this.stafflist13.map((val: { staffID: any; }) => {
        return Object.assign({}, val, this.stafflist1.filter((v: { staffID: any; }) => v.staffID == val.staffID)[0]);
      });

     

        });
    });

    const key = 'staffID'

    this.uniquelist2  = [...new Map(this.results.map((item: { [x: string]: any; }) =>
    [(item[key]), item])).values()]

    this.selecallbtn = true
    

  }


}