import { Component, OnInit } from '@angular/core';
import { DigipayrollserviceService } from 'src/app/Pages/Services/digipayrollservice.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-ytdreport-adjustment',
  templateUrl: './ytdreport-adjustment.component.html',
  styleUrls: ['./ytdreport-adjustment.component.css']
})
export class YTDReportAdjustmentComponent implements OnInit {

  constructor(private DigipayrollServiceService: DigipayrollserviceService) { }
  loader:any;
  result:any;
  Departmentlist:any;
  RoleTypeList:any;
  p: any = 1;
  count1: any = 10;
  ngOnInit(): void {
    this.year="";
    this.DigipayrollServiceService.GetDepartment().subscribe(data => {
      debugger
      this.Departmentlist = data;
    });

    this.DigipayrollServiceService.GetRoleType().subscribe(data => {
      debugger
      this.RoleTypeList = data;
    });
     

    this.GetPayGroup();
  }

  public GetPayGroup() {
    debugger
    this.DigipayrollServiceService.GetPayGroup().subscribe(
      data => {
        debugger
        this.result = data;
      })
  }


  stafflist:any;
  uniquelist1:any;
  stafflist1:any;
  results:any;
  stafflist2:any;
  uniquelist13:any;
  showtable:any;
public getemployee(){
 
 
  this.DigipayrollServiceService.GetEmployeeSalaryMonthly().subscribe(data => {
    debugger
    this.stafflist = data.filter(x => x.emplyeeYear==this.year && (x.loanpayout!=0 || x.loanpayout!=null) );
  });

    const key = 'id'
    this.DigipayrollServiceService.GetEmployeeLoans().subscribe(data => {
      debugger
      this.stafflist2 = data.filter(x => x.loanType!=null );
  

    this.results = this.stafflist2.map((val: { staffID: any; }) => {
      return Object.assign({}, val, this.stafflist.filter((v: { monthstaffid: any; }) => v.monthstaffid === val.staffID)[0]);
  
    })
  
    const key = 'monthstaffid'

    this.uniquelist13 = [...new Map(this.results.map((item: { [x: string]: any; }) =>
      [(item[key]), item])).values()]
    
      this.showtable=1
     
  
  });



}


RoleType:any;
term:any;
public FilterRoleType() {
  debugger
  
  this.DigipayrollServiceService.GetEmployeeSalaryMonthly().subscribe(data => {
    debugger
    this.stafflist = data.filter(x => x.emplyeeYear==this.year && (x.loanpayout!=0 || x.loanpayout!=null) && x.role == this.RoleType );
  });

    const key = 'id'
    this.DigipayrollServiceService.GetEmployeeLoans().subscribe(data => {
      debugger
      this.stafflist2 = data.filter(x => x.loanType!=null );
  

    this.results = this.stafflist2.map((val: { staffID: any; }) => {
      return Object.assign({}, val, this.stafflist.filter((v: { monthstaffid: any; }) => v.monthstaffid === val.staffID)[0]);
  
    })
  
    const key = 'monthstaffid'

    this.uniquelist13 = [...new Map(this.results.map((item: { [x: string]: any; }) =>
      [(item[key]), item])).values()]
    
      this.showtable=1

      this.uniquelist13=this.uniquelist13.filter((x: { role: any; })=>x.role == this.RoleType )
     
  
  });


   
  

}
Department:any;
public filterByDepartment() {
  debugger
 
  this.DigipayrollServiceService.GetEmployeeSalaryMonthly().subscribe(data => {
    debugger
    this.stafflist = data.filter(x => x.emplyeeYear==this.year && (x.loanpayout!=0 || x.loanpayout!=null)  );
  });

    const key = 'id'
    this.DigipayrollServiceService.GetEmployeeLoans().subscribe(data => {
      debugger
      this.stafflist2 = data.filter(x => x.loanType!=null );
  

    this.results = this.stafflist2.map((val: { staffID: any; }) => {
      return Object.assign({}, val, this.stafflist.filter((v: { monthstaffid: any; }) => v.monthstaffid === val.staffID)[0]);
  
    })
  
    const key = 'monthstaffid'

    this.uniquelist13 = [...new Map(this.results.map((item: { [x: string]: any; }) =>
      [(item[key]), item])).values()]
    
     
      this.uniquelist13 = this.uniquelist13.filter((x: { department_name: any; })=>x.department_name == this.Department)
      this.showtable=1
     
  
  });



  

}



  year:any;
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